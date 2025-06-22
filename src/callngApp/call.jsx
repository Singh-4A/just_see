import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

// --- Configuration ---
// URL of your Node.js signaling server
const SIGNALING_SERVER_URL = 'http://localhost:4000'; 

// Configuration for the RTCPeerConnection
const PEER_CONNECTION_CONFIG = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
};

// --- Main App Component ---
function Call() {
  // --- State Hooks ---
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callId, setCallId] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [joinCallId, setJoinCallId] = useState('');

  // --- Refs ---
  // Ref for the RTCPeerConnection instance
  const pc = useRef(null); 
  // Ref to hold the socket instance
  const socket = useRef(null);
  // Refs for video elements
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // --- Effect for Initial Setup & Cleanup ---
  useEffect(() => {
    // Connect to the signaling server
    socket.current = io(SIGNALING_SERVER_URL);
    
    // Start webcam on component mount
    startWebcam();

    // --- Socket.IO Event Listeners ---
    
    // Fired when THIS user joins a room where another user is already present.
    // The new user (this client) is responsible for initiating the call.
    socket.current.on('other-user', (otherUserId) => {
      console.log('Another user is in the room. Initiating call...');
      createOffer(otherUserId);
    });

    // Fired when an offer is received from a caller.
    socket.current.on('offer', (data) => {
      console.log('Received offer from:', data.callerId);
      createAnswer(data.sdp, data.callerId);
    });

    // Fired when an answer is received from the callee.
    socket.current.on('answer', (data) => {
      console.log('Received answer from:', data.calleeId);
      addAnswer(data.sdp);
    });

    // Fired when an ICE candidate is received from the other peer.
    socket.current.on('ice-candidate', (data) => {
      if (pc.current && data.candidate) {
        pc.current.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    });
    
    // Fired when the other user disconnects from the call.
    socket.current.on('user-disconnected', (userId) => {
      console.log('User disconnected:', userId);
      hangUp();
    });

    // Cleanup function: runs when the component is unmounted.
    return () => {
        hangUp();
        if (socket.current) {
            socket.current.disconnect();
        }
    };
  }, []);

  // --- Core WebRTC & Signaling Functions ---

  /**
   * Initializes the RTCPeerConnection object and sets up its event handlers.
   * This is a critical setup step for any WebRTC communication.
   * @param {string} targetSocketId - The socket ID of the other peer to send ICE candidates to.
   */
  const setupPeerConnection = (targetSocketId) => {
    // Close any existing connection before creating a new one.
    if (pc.current) {
      pc.current.close();
    }

    pc.current = new RTCPeerConnection(PEER_CONNECTION_CONFIG);

    // Event handler for when the local ICE agent needs to deliver a message to the other peer.
    pc.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit('ice-candidate', { candidate: event.candidate, target: targetSocketId });
      }
    };

    // Event handler for when a remote track is added to the connection.
    pc.current.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };
    
    // Add local media tracks to the connection so they can be sent to the other peer.
    if(localStream) {
        localStream.getTracks().forEach(track => {
            pc.current.addTrack(track, localStream);
        });
    }

    // Set connection state change handler for debugging and auto-hangup
    pc.current.onconnectionstatechange = () => {
        console.log(`Connection state: ${pc.current.connectionState}`);
        if (['disconnected', 'failed', 'closed'].includes(pc.current.connectionState)) {
            hangUp();
        }
    };
  };
  
  /**
   * Accesses the user's camera and microphone.
   */
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
    } catch (error) {
      console.error("Error accessing media devices.", error);
      alert("Cannot access camera and microphone. Please check permissions.");
    }
  };
  
  /**
   * Creates a WebRTC offer, sets it as the local description, 
   * and sends it to the other peer via the signaling server.
   * @param {string} targetId - The socket ID of the user to send the offer to.
   */
  const createOffer = async (targetId) => {
    setIsConnecting(true);
    setupPeerConnection(targetId);
    try {
        const offer = await pc.current.createOffer();
        await pc.current.setLocalDescription(offer);
        socket.current.emit('offer', { sdp: offer, target: targetId });
    } catch (error) {
        console.error("Error creating offer:", error);
    } finally {
        setIsConnecting(false);
    }
  };
  
  /**
   * Receives an offer, creates an answer, sets it as the local description,
   * and sends the answer back to the original caller.
   * @param {RTCSessionDescriptionInit} offerSdp - The offer SDP from the caller.
   * @param {string} callerId - The socket ID of the caller.
   */
  const createAnswer = async (offerSdp, callerId) => {
    setIsConnecting(true);
    setupPeerConnection(callerId);
    try {
        await pc.current.setRemoteDescription(new RTCSessionDescription(offerSdp));
        const answer = await pc.current.createAnswer();
        await pc.current.setLocalDescription(answer);
        socket.current.emit('answer', { sdp: answer, target: callerId });
    } catch (error) {
        console.error("Error creating answer:", error);
    } finally {
        setIsConnecting(false);
    }
  };
  
  /**
   * Sets the remote description on the caller's peer connection after receiving an answer.
   * This completes the SDP exchange and establishes the connection.
   * @param {RTCSessionDescriptionInit} answerSdp - The answer SDP from the callee.
   */
  const addAnswer = async (answerSdp) => {
    if (pc.current && !pc.current.currentRemoteDescription) {
      try {
        await pc.current.setRemoteDescription(new RTCSessionDescription(answerSdp));
        console.log("Connection established!");
      } catch (error) {
        console.error("Error setting remote description:", error);
      }
    }
  };

  /**
   * Gracefully ends the call, closes connections, and resets state.
   */
  const hangUp = () => {
    if (pc.current) {
      pc.current.close();
      pc.current = null;
    }
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    setRemoteStream(null);
    setIsCallActive(false);
    setIsConnecting(false);
    setCallId('');
    startWebcam(); // Re-enable webcam for a new call
  };

  // --- UI Event Handlers ---

  /**
   * Generates a unique ID, joins the corresponding socket room, and waits for another user.
   */
  const handleCreateCall = () => {
    const newCallId = `call-${Math.random().toString(36).substr(2, 9)}`;
    setCallId(newCallId);
    socket.current.emit('join-room', newCallId);
    setIsCallActive(true);
  };
  
  /**
   * Joins a room with the provided ID to start the connection process.
   */
  const handleJoinCall = () => {
    if (!joinCallId) {
      alert("Please enter a Call ID to join.");
      return;
    }
    setCallId(joinCallId);
    socket.current.emit('join-room', joinCallId);
    setShowModal(false);
    setIsCallActive(true);
  };

  // --- Render Logic ---
  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);


  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans antialiased">
      <div className="w-full max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            Video Call Pro
          </h1>
          <p className="text-gray-400 mt-2">Powered by React, Node.js, and WebRTC</p>
        </header>
        
        {/* Video Feeds */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800 rounded-2xl p-4 shadow-lg overflow-hidden relative">
                <h2 className="text-lg font-semibold mb-2 text-gray-300 text-center">Your Camera</h2>
                <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-auto rounded-lg bg-black transform scale-x-[-1]"></video>
            </div>
            <div className="bg-gray-800 rounded-2xl p-4 shadow-lg overflow-hidden relative">
                <h2 className="text-lg font-semibold mb-2 text-gray-300 text-center">Remote Camera</h2>
                <div className="w-full h-auto rounded-lg bg-black aspect-video flex items-center justify-center">
                    <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-auto rounded-lg transform scale-x-[-1]"></video>
                    {!remoteStream && <p className="text-gray-500">Waiting for connection...</p>}
                </div>
            </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center justify-center space-y-4">
          {!isCallActive ? (
            <div className="flex gap-4">
              <button
                onClick={handleCreateCall}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full font-semibold hover:opacity-90 transition-opacity text-lg shadow-md"
              >
                Create Call
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full font-semibold hover:opacity-90 transition-opacity text-lg shadow-md"
              >
                Join Call
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
                <button
                    onClick={hangUp}
                    className="px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full font-bold text-xl shadow-lg hover:opacity-90 transition-opacity animate-pulse"
                >
                    Hang Up
                </button>
                {callId && (
                    <div className="mt-4 p-4 bg-gray-700/50 rounded-lg text-center backdrop-blur-sm">
                        <p className="mb-2">Share this Call ID to invite someone:</p>
                        <div className="flex items-center justify-center gap-2">
                            <span className="font-mono bg-gray-800 px-3 py-1 rounded">{callId}</span>
                            <button onClick={() => navigator.clipboard.writeText(callId)} className="p-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors" title="Copy ID">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" /><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" /></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
          )}
        </div>
      </div>

      {/* Join Call Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-center w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-4">Join an Existing Call</h2>
            <p className="text-gray-400 mb-6">Enter the Call ID provided by the host.</p>
            <input
              type="text"
              value={joinCallId}
              onChange={(e) => setJoinCallId(e.target.value)}
              placeholder="Enter Call ID"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 text-center"
            />
            <div className="flex justify-center gap-4">
               <button onClick={handleJoinCall} className="w-full px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Join</button>
               <button onClick={() => setShowModal(false)} className="w-full px-6 py-3 bg-gray-600 rounded-lg font-semibold hover:bg-gray-500 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Call;
