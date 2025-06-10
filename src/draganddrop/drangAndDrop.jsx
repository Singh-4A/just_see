import React, { useState } from 'react';

function DragAndDropList() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3','Item 3']);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (sourceIndex === targetIndex) return;

    const newItems = [...items];
    const [removed] = newItems.splice(sourceIndex, 1);
    newItems.splice(targetIndex, 0, removed);

    setItems(newItems);
    setDraggedItem(null);
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          style={{
            backgroundColor: draggedItem === index ? 'lightgray' : 'white',
            padding: '10px',
            border: '1px solid #ccc',
            marginBottom: '5px',
            cursor: 'move',
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default DragAndDropList;