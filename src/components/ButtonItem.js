import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

const ButtonItem = ({ id, onUpdateColors }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: "#007bff",
    color: "white",
  });

  const [newBackgroundColor, setNewBackgroundColor] = useState(buttonStyle.backgroundColor);
  const [newFontColor, setNewFontColor] = useState(buttonStyle.color);

  const handleRightClick = (e) => {
    e.preventDefault();
    setShowColorPicker(!showColorPicker);
  };

  const handleApplyColors = () => {
    setButtonStyle({
      backgroundColor: newBackgroundColor,
      color: newFontColor,
    });

    // Call the onUpdateColors callback to pass the selected colors to App.js
    onUpdateColors(id, newFontColor, newBackgroundColor);

    setShowColorPicker(false);
  };

  return (
    <div>
      <button
        ref={setNodeRef}
        style={{
          transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
          padding: "10px 20px",
          backgroundColor: buttonStyle.backgroundColor,
          color: buttonStyle.color,
          border: "none",
          margin: "5px",
        }}
        onContextMenu={handleRightClick}
        {...listeners}
        {...attributes}
      >
        Button
      </button>

      {showColorPicker && (
        <div
          style={{
            position: "absolute",
            top: `${transform?.y + 50}px`,
            left: `${transform?.x}px`,
            background: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
            zIndex: 1000,
          }}
        >
          <label>
            Background Color:{" "}
            <input
              type="color"
              value={newBackgroundColor}
              onChange={(e) => setNewBackgroundColor(e.target.value)}
            />
          </label>
          <br />
          <label>
            Font Color:{" "}
            <input
              type="color"
              value={newFontColor}
              onChange={(e) => setNewFontColor(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleApplyColors}>Apply</button>
        </div>
      )}
    </div>
  );
};

export default ButtonItem;
