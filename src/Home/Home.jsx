import React, { useState } from 'react'
import { paginationData } from '../utilal'
const Home = () => {
    const [data, setData] = useState(paginationData)

    let accordion = (i) => {
        setData(prev => prev.map((item, id) => {
            return id === i ? {
                ...item,
                isTrue: !item?.isTrue,
            } : { ...item, isTrue: false }
        }))
    }

    return (
        <div>
            {
                data?.map((item, index) => {
                    return <div key={index} style={{
                        backgroundColor: "blue",
                        color: 'white',
                        borderBottom: '3px solid white',
                        padding:10
                    }}> <h1 onClick={() => accordion(index)}>{item.first_name}   {item.last_name}</h1>
                        {
                            item.isTrue && <div>
                                {item.email}
                                {item.phone}
                            </div>
                        }
                        { }
                    </div>
                })
            }
        </div>
    )
}

export default Home