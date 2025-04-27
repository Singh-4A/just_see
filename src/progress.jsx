import { useState, useEffect } from "react";

function ProgressBar({ value = 0 }) {
  const [progressValue, setProgressValue] = useState(value);

  useEffect(() => {
    setProgressValue(Math.min(100, Math.max(value, 0)));
  }, [value]);

  return (
    <div
      style={{
        position: "relative",
        width: "400px",
        height: "30px",
        borderRadius: "15px",
        border: "1px solid black",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          width: `${progressValue}%`,
          height: "100%",
          borderRadius: "15px",
          background: "#4caf50",
        }}
      />
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          color: progressValue < 49 ? "black" : "#fff",
          fontWeight: "bold",
        }}
      >
        {progressValue} %
      </span>
    </div>
  );
}

export default ProgressBar;
