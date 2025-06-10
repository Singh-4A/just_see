import React, { useEffect, useState } from "react";
import "./traffic.css";
export const TrafficLight = () => {
  const trafficData = [
    {
      color: "red",
      order: 1,
      sequence: 2,
      time: 1000,
    },
    {
      color: "blue",
      order: 2,
      sequence: 2,
      time: 1000,
    },
    {
      color: "yellow",
      order: 3,
      sequence: 1,
      time: 1000,
    },
       {
      color: "white",
      order: 4,
      sequence: 4,
      time: 1000,
    },
  ];

  function orderLight(random) {
    return random.toSorted((a, b) => a.order - b.order);
  }

  function sequenceLightOrder(random) {
    return random.toSorted((a, b) => a.sequence - b.sequence);
  }

  const [order,/*setOrder*/] = useState(orderLight(trafficData));
  const [sequenceOrder, /*setSequenceOrder*/] = useState(
    sequenceLightOrder(trafficData)
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeOutId = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % order.length);
    }, order[currentIndex].time);
    return () => clearTimeout(timeOutId);
  }, [order, currentIndex]);

  const color = sequenceOrder[currentIndex];

  return (
    <div
      style={{
        margin: "auto",
        width: "fit-content",
        backgroundColor: "black",
        padding: 10,
        borderRadius: 15,
        marginTop: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        {order.map((item) => {
          return (
            <Light color={color.color === item.color ? item.color : "gray"} />
          );
        })}
      </div>
    </div>
  );
};

function Light({ color }) {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: color,
      }}
    ></div>
  );
}
export default TrafficLight;


