import React, { useEffect, useState } from 'react'

function progress({ value }) {
  const [progressValue, setProgressValue] = useState(value)

  useEffect(() => {
    setProgressValue(Math.min(100, Math.max(0, value)))
  }, [value])

  return (
    <div style={{
      height: 40,
      width: 400,
      position: "relative",
      margin: 'auto',
      border: "1px solid black",
      borderRadius: 50,
      marginTop: 20
    }}>
      <div style={{
        position: 'absolute',
        left: "40%",
        top: -5,
        transform: "translate(50% ,50%)",
        color: progressValue > 50 ? "white" : "black"
      }}>
        {progressValue}%

      </div>
      <div style={{
        height: 40,
        width: `${progressValue}%`,
        backgroundColor: '#2769ab',
        borderRadius: 50
      }}>
      </div>
      <div style={{
        textAlign:'center'
      }}> 
        {progressValue >= 100 ? "Compalte" : "Loading..."}
      </div>
    </div>
  )
}

export default progress