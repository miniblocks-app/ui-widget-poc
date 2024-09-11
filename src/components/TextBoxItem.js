import React from "react";
import { useDraggable } from "@dnd-kit/core";

const TextBoxItem = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  return (
    <input
      ref={setNodeRef}
      style={{
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
        padding: "5px",
        width: "150px",
        margin: "5px",
      }}
      {...listeners}
      {...attributes}
      type="text"
      placeholder="Text Box"
    />
  );
};

export default TextBoxItem;
