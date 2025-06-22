import React, { useState } from 'react';

function DraggableItem({ id, children }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('itemId', id);
  };

  return (
    <div draggable="true" onDragStart={handleDragStart}>
      {children}
    </div>
  );
}


function DropZone({ onDrop, children }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const itemId = e.dataTransfer.getData('itemId');
    onDrop(itemId);
  };

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop}>
      {children}
    </div>
  );
}

function DragAndDropSandbox() {
  const [droppedItem, setDroppedItem] = useState(null);

  const handleDrop = (itemId) => {
    setDroppedItem(itemId);
  };

  return (
    <div>
      <DraggableItem id="item1">Item 1</DraggableItem>
      <DraggableItem id="item2">Item 2</DraggableItem>
      <DropZone onDrop={handleDrop}>
        {droppedItem ? `Dropped Item: ${droppedItem}` : 'Drop Zone'}
      </DropZone>
    </div>
  );
}

export default DragAndDropSandbox;