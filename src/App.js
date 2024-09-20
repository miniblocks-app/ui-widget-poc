import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import ButtonItem from "./components/ButtonItem";
import TextBoxItem from "./components/TextBoxItem";
import DroppableSpace from "./components/DroppableSpace";
import FlutterConverter from "./utils/FlutterConverter"; // Import the new component
import { useSelector, useDispatch } from 'react-redux';
import { addItem, updateItemColors } from './redux/droppedItemsSlice';

const App = () => {
  const dispatch = useDispatch();
  const droppedItems = useSelector((state) => state.droppedItems.items);
  const [flutterCode, setFlutterCode] = useState("");

  const handleDragEnd = (event) => {
    const { id } = event.active;
    const { x, y } = event.delta;

    const existingItem = droppedItems.find(item => item.id === id);

    if (existingItem) {
      dispatch(addItem({ ...existingItem, position: { x, y } }));
    } else {
      const newItem = { id, position: { x, y }, color: "white", backgroundColor: "#007bff" };
      dispatch(addItem(newItem));
    }
  };

  const handleUpdateColors = (id, color, backgroundColor) => {
    dispatch(updateItemColors({ id, color, backgroundColor }));
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const filteredItems = droppedItems.filter(item =>
    !(item.position.x === 0 && item.position.y === 0)
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Drag and Drop Kit</h1>
      </div>
      <div style={{ display: "flex", gap: "20px", alignSelf: 'center' }}>
        {/* Left Panel */}
        <div style={{ width: '450px', padding: '10px' }}>
          <h3>Predefined Items</h3>
          <ButtonItem id="button1" onUpdateColors={handleUpdateColors} />
          <TextBoxItem id="textbox1" color="blue" />
        </div>

        {/* Middle Panel (Droppable Workspace) */}
        <DroppableSpace droppedItems={droppedItems} style={{ alignSelf: 'center' }} />

        {/* Right Panel (Generated JSON and Convert Button) */}
        <div style={{ padding: '10px' }}>
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
