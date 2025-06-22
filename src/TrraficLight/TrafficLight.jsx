import React, { useEffect, useMemo, useState } from "react";
import "./traffic.css";
export const TrafficLight = () => {
  const trafficData = [
    {
      color: "red",
      order: 3,
      sequence: 1,
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
      order: 1,
      sequence: 3,
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
    return random.toSorted((a, b) => a.order - b.order)
  }

  function sequenceOrder(random) {
    return random.toSorted((a, b) => a.sequence - b.sequence)
  }

  const order = useMemo(() => orderLight(trafficData), []);
  const sequence = useMemo(() => sequenceOrder(trafficData), []);

  const [currentIndex, setCurrentIndex] = useState(0)


  useEffect(() => {
    let timeId = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % order.length)
    }, order[currentIndex].time)
    return () => clearTimeout(timeId)
  }, [order, currentIndex])




  let sequenceOrderLight = sequence[currentIndex]


  return (
    <div style={{
      backgroundColor: "black",
      width: "fit-content",
      maxHeight: 800,
      margin: 'auto',
      marginTop: 10,
      padding: 10,
      borderRadius: 30,

    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 7

      }}>
        {
          order.map((item, i) => {
            return <Light key={i} color={sequenceOrderLight.color === item.color ? item.color : "gray"} />
          })
        }


      </div>

    </div>
  );
};


function Light({ color }) {
  return <div style={{
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: color
  }}>
  </div>
}

export default TrafficLight;


