import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import ButtonItem from "./components/ButtonItem";
import TextBoxItem from "./components/TextBoxItem";
import DroppableSpace from "./components/DroppableSpace";
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, resetItems } from './redux/droppedItemsSlice';

const App = () => {
  const dispatch = useDispatch();
  const droppedItems = useSelector((state) => state.droppedItems.items);
  const [localItems, setLocalItems] = useState([]);

  const handleDragEnd = (event) => {
    const { id } = event.active;
    const { x, y } = event.delta;

    // Check if the item is already in the workspace
    const existingItem = droppedItems.find(item => item.id === id);

    if (existingItem) {
      // If item is already in the workspace, update its position
      dispatch(addItem({ ...existingItem, position: { x, y } }));
    } else {
      // Otherwise, add a new item
      const newItem = { id, position: { x, y }, color: "blue" };
      dispatch(addItem(newItem));
      setLocalItems((prev) => [...prev, newItem]);
    }
  };

  const handleReset = () => {
    dispatch(resetItems()); // Reset the workspace in Redux
    setLocalItems([]);     // Clear local state
  };

  // Filter out items with position (0, 0)
  const filteredItems = droppedItems.filter(item => 
    !(item.position.x === 0 && item.position.y === 0)
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Drag and Drop Kit</h1>
      </div>
      <div style={{ display: "flex", gap: "20px", alignSelf: 'center'}}>
        {/* Left Panel */}
        <div style={{ width: '450px', padding: '10px'}}>
          <h3>Predefined Items</h3>
          <ButtonItem id="button1" color="blue" />
          <TextBoxItem id="textbox1" color="blue" />
        </div>

        {/* Middle Panel (Droppable Workspace) */}
        <DroppableSpace droppedItems={droppedItems} style ={{alignSelf:'center'}} />

        {/* Right Panel (Generated JSON) */}
        <div style={{ padding: '10px' }}>
          <h3>Generated JSON</h3>
          <pre>{JSON.stringify(filteredItems, null, 2)}</pre>
          <button onClick={handleReset} style={{ marginTop: "10px", padding: "10px" }}>
            Reset
          </button>
        </div>
      </div>
    </DndContext>
  );
};

export default App;
