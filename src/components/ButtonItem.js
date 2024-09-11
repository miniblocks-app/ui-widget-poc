import React from "react";
import { useDraggable } from "@dnd-kit/core";

const ButtonItem = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  return (
    <button
      ref={setNodeRef}
      style={{
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        margin: "5px",
      }}
      {...listeners}
      {...attributes}
    >
      Button
    </button>
  );
};

export default ButtonItem;
