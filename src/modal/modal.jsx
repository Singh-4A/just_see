import React from "react";
import "./modal.css";
export const Modal = ({ setOpenModal }) => {
  return (
    <div className="container">
      <div className="modal">
        <button onClick={() => setOpenModal(false)}>Close</button>
      </div>
    </div>
  );
};
