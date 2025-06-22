import React, { useEffect, useMemo, useState } from 'react'


import "./style.css"

function debounce(callback, time) {
    let timeId;
    return (...arg) => {
        if (timeId) clearTimeout(timeId)
        timeId = setTimeout(() => {
            callback(...arg)
        }, time)
    }
}

export const AutoComponent = () => {
    const [suggestion, setSuggestion] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [InputField, setInputValue] = useState("")
    const [skipNextSearch, setSkipNextSearch] = useState(false); // 🔥 new


    const debounceCall = useMemo(() => debounce(async (query) => {

        try {
            if (!query || query.length <= 1) return
            const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
            const data = await response.json();
            setSuggestion(data?.recipes || []);
            setLoading(false);
            setError(false);


        } catch (err) {
            setError(true);
            setLoading(false);
        }
    }, 1000), []);



    async function fetchingList(qury) {
        setSkipNextSearch(false)
        if (skipNextSearch) {
            if (InputField.length < 0) {
                setSuggestion([])
            }

        } else {
            setError(false)
            setLoading(true)
            debounceCall(qury)
        }


    }

    function onSelect(value) {
        setInputValue(value)
        setSuggestion([])
        setSkipNextSearch(true)
    }

    function getSuggestion(query) {
        let results;

        if (fetchingList) {

        }
    }

    useEffect(() => {
        if (InputField.length < 0) {
            getSuggestion(query)

        }
    }, [InputField])



    return (
        <div style={{
            position: "relative",
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: "center",

        }}>
            <div>
                <InputFiled
                    dataKey={"name"}
                    onChange={() => { }}
                    onBlur={() => debounceCall("bi")}
                    suggestionList={[]}
                    loading={<>Loading</>}
                    error={<>Something went wrong!</>}
                    fetchingList={fetchingList}
                    setSuggestion={setSuggestion}
                    InputField={InputField}
                    setInputValue={setInputValue}
                />
            </div>

            <div style={{
                overflow: 'auto',
                height: "400px",
            }}>
                <ul >
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div style={{ color: "red" }}>Something went wrong</div>
                    ) : suggestion.length < 0 ? (
                        <div>No results found</div>
                    ) : (
                        <SuggetionComponent suggestion={suggestion} onSelect={onSelect}
                            highlightText={InputField}
                        />
                    )}


                </ul>
            </div>

        </div>
    )
}





function InputFiled({ fetchingList, setSuggestion, setInputValue, InputField, onBlur }) {

    function onChangeHandler(e) {
        const { value } = e.target
        setInputValue(value)
        if (value.length <= 1) {
            setSuggestion([])

        }
    }


    useEffect(() => {
        if (InputField.length > 1) {
            fetchingList(InputField)
        }
    }, [InputField])



    return <div style={{

    }}>
        <input value={InputField} type='text' onChange={onChangeHandler} onBlur={onBlur}
            className='border border-blue-700 rounded-[3px]  px-2 py-1 w-[300px]' />
    </div>
}





function SuggetionComponent({ suggestion = [], onSelect, highlightText }) {



    function getHighlightedText(text, highlight) {
        if (!highlight) return;

        let parts = text.split(new RegExp(`(${highlight})`, "gi"))

        return parts.map((part) => part.toLowerCase() === highlight.toLowerCase() ? (<span style={{
            fontWeight: "bold",
            backgroundColor: 'yellow',
        }}> {part}</span>) : <span>
            {part}
        </span>)


    }






    return <div style={{
        width: "300px"

    }}
        className='hover'>
        {suggestion.map((item, index) => {
            return < li key={index} style={{
                cursor: 'pointer'
            }} onClick={() => onSelect(item.name)}>
                {getHighlightedText(item.name, highlightText)}
            </li >
        })}
    </div>
}


