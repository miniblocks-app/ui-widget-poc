import React from "react";
import { useDroppable } from "@dnd-kit/core";

const DroppableSpace = ({ onDrop }) => {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: "500px",
        height: "500px",
        border: "2px dashed #ccc",
        backgroundColor: isOver ? "lightgreen" : "white",
      }}
    >
      Drop here
    </div>
  );
};

export default DroppableSpace;
