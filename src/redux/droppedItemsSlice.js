import { createSlice } from "@reduxjs/toolkit";

const droppedItemsSlice = createSlice({
  name: "droppedItems",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateItemPosition: (state, action) => {
      const { id, position } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.position = position;
      }
    },
    updateItemColors: (state, action) => {
      const { id, color, backgroundColor } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.color = color;
        item.backgroundColor = backgroundColor;
      }
    },
  },
});

export const { addItem, updateItemPosition, updateItemColors } = droppedItemsSlice.actions;
export default droppedItemsSlice.reducer;
