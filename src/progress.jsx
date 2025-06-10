import { useState, useEffect } from "react";
import "./app.css";

function ProgressBar({ value }) {
  const [progressValue, setProgressValue] = useState(value);

  useEffect(() => {
    setProgressValue(Math.min(100, Math.max(value, 0)));
  }, [value]);

  return (
    <div
      style={{
        position: "relative",
        margin: "auto",
        width: "400px",
        height: 50,
        border: "1px solid black",
        borderRadius: 30,
        marginTop: 10,
      }}
    >
      <div
        style={{
          position: "absolute",
          transform: "translate(-50% -50%)",
          top: "30%",
          left: "50%",
          color: progressValue >50 ? "white" : "black",
          zIndex:1000
        }}
      >
        {progressValue}%
      </div>
      <div
        style={{
          height: "100%",
          backgroundColor: "blue",
          width: `${progressValue}%`,
          position: "absolute",
          borderRadius: 20,
        }}
      />
    </div>
  );
}

export default ProgressBar;
