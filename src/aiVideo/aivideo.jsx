import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const VideoCreate = () => {
  const [text, setText] = useState('Hello world!');
  const [selectedAvatar, setSelectedAvatar] = useState('avatar1');
  const [selectedVoice, setSelectedVoice] = useState('');
  const [selectedBackground, setSelectedBackground] = useState('bg1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const [voices, setVoices] = useState([]);
  const [language, setLanguage] = useState('en'); // 'en' for English, 'hi' for Hindi

  // UI Translations
  const translations = {
    en: {
      title: 'AI Video Generator',
      settings: 'Settings',
      textToSpeak: 'Text to speak',
      voice: 'Voice',
      loadingVoices: 'Loading voices...',
      previewVoice: 'Preview Voice',
      avatar: 'Avatar',
      background: 'Background',
      generateVideo: 'Generate Video',
      generating: 'Generating...',
      preview: 'Preview',
      generatedVideo: 'Generated Video',
      downloadVideo: 'Download Video',
      videoWillAppear: 'Your video will appear here',
      enterTextPrompt: 'Please enter some text',
      generationError: 'Generation error:',
      previewError: 'Could not preview audio',
      switchToHindi: 'Switch to Hindi',
    },
    hi: {
      title: 'एआई वीडियो जेनरेटर',
      settings: 'सेटिंग्स',
      textToSpeak: 'बोलने के लिए टेक्स्ट',
      voice: 'आवाज़',
      loadingVoices: 'आवाज़ें लोड हो रही हैं...',
      previewVoice: 'आवाज़ का पूर्वावलोकन करें',
      avatar: 'अवतार',
      background: 'बैकग्राउंड',
      generateVideo: 'वीडियो बनाएं',
      generating: 'बनाया जा रहा है...',
      preview: 'पूर्वावलोकन',
      generatedVideo: 'जेनरेट किया गया वीडियो',
      downloadVideo: 'वीडियो डाउनलोड करें',
      videoWillAppear: 'आपका वीडियो यहां दिखाई देगा',
      enterTextPrompt: 'कृपया कुछ टेक्स्ट दर्ज करें',
      generationError: 'उत्पन्न करने में त्रुटि:',
      previewError: 'ऑडियो का पूर्वावलोकन नहीं किया जा सका',
      switchToEnglish: 'Switch to English',
    },
  };

  const t = translations[language];

  // Load browser voices for English and Hindi
  useEffect(() => {
    const loadVoices = () => {
      const browserVoices = window.speechSynthesis.getVoices();
      // Filter for English and Hindi voices
      const supportedVoices = browserVoices.filter(voice => voice.lang.startsWith('en-') || voice.lang.startsWith('hi-'));
      setVoices(supportedVoices);
      if (supportedVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(supportedVoices[0].voiceURI);
      }
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, [selectedVoice]);

  // Avatars and backgrounds data (assuming these are language-agnostic)
  const avatars = [
    { id: 'avatar1', name: 'Alex', image: 'https://avatar.iran.liara.run/public/1' },
    { id: 'avatar2', name: 'Sophia', image: 'https://avatar.iran.liara.run/public/2' },
    { id: 'avatar3', name: 'James', image: 'https://avatar.iran.liara.run/public/3' },
    { id: 'avatar4', name: 'Emma', image: 'https://avatar.iran.liara.run/public/4' },
  ];

  const backgrounds = [
    { id: 'bg1', name: 'Office', image: 'https://source.unsplash.com/random/800x600/?office' },
    { id: 'bg2', name: 'Nature', image: 'https://source.unsplash.com/random/800x600/?nature' },
    { id: 'bg3', name: 'City', image: 'https://source.unsplash.com/random/800x600/?city' },
    { id: 'bg4', name: 'Abstract', image: 'https://source.unsplash.com/random/800x600/?abstract' },
  ];

  // Generate speech audio in browser
const generateSpeechInBrowser = (text, voiceURI) => {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject('Browser does not support speech synthesis');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(v => v.voiceURI === voiceURI);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Create audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const mediaStreamDest = audioContext.createMediaStreamDestination();
    const mediaRecorder = new MediaRecorder(mediaStreamDest.stream);
    
    const chunks = [];
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/wav' });
      resolve(blob);
    };

    // Error handling
    utterance.onerror = (event) => {
      reject(`Speech synthesis error: ${event.error}`);
    };

    // Connect nodes
    const sourceNode = audioContext.createBufferSource();
    sourceNode.connect(mediaStreamDest);

    // Start recording
    mediaRecorder.start();
    
    // Speak and handle completion
    utterance.onend = () => {
      setTimeout(() => {
        mediaRecorder.stop();
        audioContext.close();
      }, 500); // Small delay to ensure all audio is captured
    };

    window.speechSynthesis.speak(utterance);
  });
};
  // Generate video
const generateVideo = async () => {
  if (!text.trim()) {
    alert(t.enterTextPrompt);
    return;
  }

  setIsGenerating(true);
  setProgress(0);
  setVideoUrl('');

  try {
    // Generate audio
    const audioBlob = await generateSpeechInBrowser(text, selectedVoice);
    
    // Prepare form data
    const formData = new FormData();
    formData.append('text', text);
    formData.append('avatar', selectedAvatar);
    formData.append('background', selectedBackground);
    formData.append('audio', audioBlob, 'speech.wav');

    // Send to backend with progress tracking
    const response = await axios.post("http://localhost:500/api/generate", formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percent);
      },
      responseType: 'blob'
    });

    // Create video URL
    const videoBlob = new Blob([response.data], { type: 'video/mp4' });
    const videoUrl = URL.createObjectURL(videoBlob);
    setVideoUrl(videoUrl);

  } catch (error) {
    console.error('Generation error:', error);
  } finally {
    setIsGenerating(false);
  }
};
  // Preview audio
  const playPreviewAudio = async () => {
    if (!text.trim()) return;
    try {
      const audioBlob = await generateSpeechInBrowser(text, selectedVoice);
      audioRef.current.src = URL.createObjectURL(audioBlob);
      audioRef.current.play();
    } catch (error) {
      console.error(t.previewError, error);
      alert(t.previewError);
    }
  };
  
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    // Optionally, change the default text when language changes
    setText(newLang === 'en' ? 'Hello world!' : 'नमस्ते दुनिया!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-700">{t.title}</h1>
            <button
                onClick={toggleLanguage}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
                {language === 'en' ? t.switchToHindi : t.switchToEnglish}
            </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls panel */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">{t.settings}</h2>
            
            {/* Text input */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">{t.textToSpeak}</label>
              <textarea
                className="w-full p-3 border rounded-lg"
                rows="5"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
            
            {/* Voice selection */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">{t.voice}</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                disabled={voices.length === 0}
              >
                {voices.length === 0 ? (
                  <option>{t.loadingVoices}</option>
                ) : (
                  voices.map(voice => (
                    <option key={voice.voiceURI} value={voice.voiceURI}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))
                )}
              </select>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={playPreviewAudio}
                disabled={!text.trim() || voices.length === 0}
              >
                {t.previewVoice}
              </button>
              <audio ref={audioRef} className="hidden" />
            </div>
            
            {/* Avatar selection */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">{t.avatar}</label>
              <div className="grid grid-cols-2 gap-4">
                {avatars.map(avatar => (
                  <div
                    key={avatar.id}
                    className={`p-2 border-2 rounded-lg cursor-pointer ${
                      selectedAvatar === avatar.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedAvatar(avatar.id)}
                  >
                    <img src={avatar.image} alt={avatar.name} className="w-full h-24 object-cover rounded-md" />
                    <p className="text-center mt-1">{avatar.name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Background selection */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">{t.background}</label>
              <div className="grid grid-cols-2 gap-4">
                {backgrounds.map(bg => (
                  <div
                    key={bg.id}
                    className={`p-2 border-2 rounded-lg cursor-pointer ${
                      selectedBackground === bg.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedBackground(bg.id)}
                  >
                    <img src={bg.image} alt={bg.name} className="w-full h-16 object-cover rounded-md" />
                    <p className="text-center mt-1 text-sm">{bg.name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Generate button */}
            <button
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300"
              onClick={generateVideo}
              disabled={isGenerating || !text.trim()}
            >
              {isGenerating ? `${t.generating} ${progress}%` : t.generateVideo}
            </button>
          </div>
          
          {/* Preview and result panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preview panel */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-600">{t.preview}</h2>
              <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
                {selectedBackground && (
                  <img 
                    src={backgrounds.find(bg => bg.id === selectedBackground)?.image} 
                    alt="Background" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <img 
                    src={avatars.find(av => av.id === selectedAvatar)?.image} 
                    alt="Avatar" 
                    className="h-48 object-contain"
                  />
                </div>
              </div>
            </div>
            
            {/* Result panel */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-600">{t.generatedVideo}</h2>
              {isGenerating ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-indigo-600 h-4 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              ) : videoUrl ? (
                <div className="relative">
                  <video 
                    src={videoUrl}
                    controls 
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="mt-4 flex justify-end">
                    <a 
                      href={videoUrl} 
                      download="generated-video.mp4"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      {t.downloadVideo}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                  <p className="text-gray-500">{t.videoWillAppear}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCreate;