import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useRef, useState } from 'react'
import { Message } from "./Message"
import "./ai.css"
import DeleteIcon from '@mui/icons-material/Delete';


export const Chatbot = () => {

    const [storeAiData, setStoreAiData] = useState([])
    const [apiStatus, setApiStatus] = useState(false)
    const [userTypeValue, setUserTypeValue] = useState("")
    const [historyData, setHistoryData] = useState([])

    const bottomRef = useRef(null)

    useEffect(() => {
        if (apiStatus === "sucsess") {
            // Delay to allow DOM update
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
            }, 0);

            localStorage.setItem("history", JSON.stringify(storeAiData));
        }
    }, [apiStatus, storeAiData]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("history"))
        if (data) {
            setHistoryData(data)

        }


    }, [])

    async function sendDataHandler(value) {
        setApiStatus("loading")

        setStoreAiData((prev) => ([...prev, { text: value, user: true }]))

        // setHistoryData((prev) => [...prev, { text: value, user: true }])
        const newUserMsg = { text: value, user: true };
        setHistoryData(prev => {
            const updated = [...prev, newUserMsg];
            localStorage.setItem("history", JSON.stringify(updated));
            return updated;
        });


        setUserTypeValue("")

        try {
            const response = await axios(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.API_KEY}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "contents": [
                        {
                            "parts": [
                                {
                                    "text": value
                                }
                            ]
                        }
                    ]
                }

            })


            if (response.status === 200) {
                setApiStatus("sucsess")
                setStoreAiData((prev) => ([...prev, { text: response.data?.candidates[0]?.content?.parts[0]?.text, user: false }]))
            }

        } catch (error) {
            setApiStatus(error)
            setUserTypeValue("")
            enqueueSnackbar(error, {
                variant: "error"
            })
        }


    }

    function onChangeHnndler(value) {
        setUserTypeValue(value)


    }

    const [filterHistoryData, setFilterHistoryData] = useState("")
    function historyHandler(value) {
        setFilterHistoryData(value)
    }



    return (

        <div class="flex  h-[90vh]  ">

            <div style={{
                backgroundColor: "#232323"
            }} className="basis-1/6 p-3  text-center overflow-auto histroy"
            >

                <h1 style={{
                    fontWeight: 800,
                    fontSize: 20
                }} className="bg-gradient-to-r from-blue-800 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text p-1">Histroy</h1>
                {
                    historyData?.filter((item) => item?.user || !item?.user).map((item, idx) => {

                        if (item?.user && item.text) {
                            return <div key={idx} className='card' onClick={() => historyHandler(item)} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>

                                <div >
                                    {item?.user && item.text}

                                </div>
                                <div onClick={() => {
                                    setHistoryData((prev) => prev.filter((_, i) => i !== idx))
                                }}>
                                    <DeleteIcon />
                                </div>
                            </div>
                        }

                    })
                }

            </div>


            <div className="flex flex-col flex-1 bg-gray-200 p-4"


            >



                <div className="flex-1 overflow-auto chat-container">
                    {storeAiData.map((item, idx) => {
                        return <Message key={idx} text={item.text} isUser={item.user} />
                    })}
                    <div ref={bottomRef} />
                </div>
                {/* Content section */}

                {apiStatus === "loading" && "Loading..."}

                <div className="flex space-x-2 mt-4 items-center ">
                    <input
                        className="flex-1 border px-3 py-2 rounded-full"
                        value={userTypeValue}
                        type='text'
                        placeholder='search anything'
                        onChange={(e) => onChangeHnndler(e.target.value)} />

                    <div>
                        <button onClick={() => sendDataHandler(userTypeValue)} id="composer-submit-button" aria-label="Send prompt" data-testid="send-button" class="dark:disabled:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary flex items-center justify-center rounded-full transition-colors hover:opacity-70 disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:focus-visible:outline-white bg-black text-white disabled:bg-[#D7D7D7] dark:bg-white dark:text-black h-9 w-9"><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M8.99992 16V6.41407L5.70696 9.70704C5.31643 10.0976 4.68342 10.0976 4.29289 9.70704C3.90237 9.31652 3.90237 8.6835 4.29289 8.29298L9.29289 3.29298L9.36907 3.22462C9.76184 2.90427 10.3408 2.92686 10.707 3.29298L15.707 8.29298L15.7753 8.36915C16.0957 8.76192 16.0731 9.34092 15.707 9.70704C15.3408 10.0732 14.7618 10.0958 14.3691 9.7754L14.2929 9.70704L10.9999 6.41407V16C10.9999 16.5523 10.5522 17 9.99992 17C9.44764 17 8.99992 16.5523 8.99992 16Z"></path></svg></button>
                    </div>
                </div>

            </div>



        </div>
    )
}   
