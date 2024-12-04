import React from "react";
import { useDroppable } from "@dnd-kit/core";

const DroppableSpace = ({ onDrop }) => {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: "320px",
        height: "700px",
        border: "2px dashed #ccc",
        borderRadius: "10px",
        backgroundColor: isOver ? "lightgreen" : "white"
      }}
    ><div style={{position: "relative", display: "flex", justifyContent:"center", alignItems: "center"}}>Drop here</div> 
    </div>
  );
};

export default DroppableSpace;
