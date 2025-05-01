import React, { useEffect, useState } from "react";
import "./traffic.css";

function TrafficLight() {
  const trafficData = [
    { color: "red", time: 1000, startDisplayOrder: 2, order: 1 },
    { color: "green", time: 1000, startDisplayOrder: 1, order: 2 },
    { color: "yellow", time: 1000, startDisplayOrder: 3, order: 3 },
  ];

  const startLightOrder = (random) =>
    random.toSorted((a, b) => a.startDisplayOrder - b.startDisplayOrder);

  const currentStartOrder = (random) =>
    random.toSorted((a, b) => a.order - b.order);

  const [startOrder, setStartOrder] = useState(startLightOrder(trafficData));
  const [order, setOrder] = useState(currentStartOrder(trafficData));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const time = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % order.length);
    }, order[currentIndex].time);

    return () => clearTimeout(time);
  }, [order, currentIndex]);

  const active = startOrder[currentIndex].order;

  

  return (
    <div className="traffic_container">
      <div className="traffic">
        {order.map((item) => (
          <Light color={active === item.order ? item.color : "gray"} />
        ))}
      </div>
    </div>
  );
}

function Light({ color }) {
  return (
    <div
      style={{
        backgroundColor: color,
      }}
      className="traffic_light"
    ></div>
  );
}

export default TrafficLight;
