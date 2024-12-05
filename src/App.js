import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import ButtonItem from "./components/ButtonItem";
import TextBoxItem from "./components/TextBoxItem";
import DroppableSpace from "./components/DroppableSpace";
import FlutterConverter from "./utils/FlutterConverter"; // Import the new component
import { useSelector, useDispatch } from 'react-redux';
import { addItem, updateItemPosition, updateItemColors } from './redux/droppedItemsSlice';
import miniblocksLogo from './assets/miniblocks-logo.jpeg';

const App = () => {
  const dispatch = useDispatch();
  const droppedItems = useSelector((state) => state.droppedItems.items);
  const [flutterCode, setFlutterCode] = useState("");

  const handleDragEnd = (event) => {
    const { id } = event.active;
    const { delta } = event;

    const existingItem = droppedItems.find(item => item.id === id);

    if (existingItem) {
      // Update position relative to its current position in the workspace
      const newPosition = {
        x: existingItem.position.x + delta.x,
        y: existingItem.position.y + delta.y,
      };
      dispatch(updateItemPosition({ id, position: newPosition }));
    } else {
      // Add a new item if not already in the workspace
      const newItem = {
        id,
        position: { x: delta.x, y: delta.y },
        color: "white",
        backgroundColor: "#007bff",
      };
      dispatch(addItem(newItem));
    }
  };

  const handleUpdateColors = (id, color, backgroundColor) => {
    dispatch(updateItemColors({ id, color, backgroundColor }));
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const filteredItems = droppedItems.filter(
    item => item.position.x !== 0 || item.position.y !== 0
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ textAlign: "center", padding: "20px", display: "flex", position:"relative", justifyContent: "center"}}>
        <img src={miniblocksLogo} alt="Logo" style={{ width: "auto", height: "60px" }} />
        <h1>UI Widget POC</h1>
      </div>
      <div style={{ display: "flex", gap: "20px", alignSelf: "center" }}>
        {/* /* Left Panel */ }
        <div style={{ width: "450px", padding: "10px", backgroundColor: "#D9D9D9", marginInline: "15px", borderRadius: "10px", textAlign: "center" }}>
          <h3>Widget Library</h3>
          <div style={{ position: "relative", display: "flex"}}>
          <ButtonItem id="button1" onUpdateColors={handleUpdateColors} />
          <TextBoxItem id="textbox1" color="blue" />
          </div>
          
        </div>

        {/* Middle Panel (Droppable Workspace) */}
        <DroppableSpace droppedItems={droppedItems} style={{ alignSelf: "center" }} />

        {/* Right Panel (Generated JSON and Convert Button) */}
        <div style={{ padding: "10px" }}>
          <h3>Generated JSON</h3>
          <pre>{JSON.stringify(filteredItems, null, 2)}</pre>
          <FlutterConverter filteredItems={filteredItems} setFlutterCode={setFlutterCode} />
          {flutterCode && (
            <div style={{ marginTop: "20px", whiteSpace: "pre-wrap", textAlign: "left" }}>
              <h4>Generated Flutter Code:</h4>
              <pre>{flutterCode}</pre>
            </div>
          )}
          <button onClick={handleRefresh} style={{ marginTop: "10px", padding: "10px" }}>
            Reset
          </button>
        </div>
      </div>
    </DndContext>
  );
};

export default App;
