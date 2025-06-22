import { useState, useEffect } from "react";

function ProgressBar({ value }) {
  const [progressValue, setProgressValue] = useState(value);

  useEffect(() => {
    if (progressValue <= 100)
      setProgressValue(Math.min(100, Math.max(0, value)))

  }, [value]);

  return (
    <div style={{
      position: "relative",
      width: 400,
      height: 50,
      border: "1px solid black",
      margin: 'auto',
      marginTop: 10,
      borderRadius: 50
    }}>
      <div style={{
        position: 'absolute',
        left: "50%",
        top: "24%",
        color: progressValue < 50 ? "black" : "white"
      }}>
        {value}%
      </div>
      <div style={{
        background: '#00ff4e',
        width: `${progressValue}%`,
        height: "100%",
        borderRadius: 50

      }}>


      </div>
      {progressValue < 100 ? "Loading..." : "Complete"}
    </div>
  );
}

export default ProgressBar;
