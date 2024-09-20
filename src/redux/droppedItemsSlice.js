// droppedItemsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const droppedItemsSlice = createSlice({
  name: 'droppedItems',
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existingItemIndex = state.items.findIndex(i => i.id === item.id);

      if (existingItemIndex > -1) {
        // Update the item, preserving position and adding new colors if provided
        state.items[existingItemIndex] = {
          ...state.items[existingItemIndex],
          ...item, // This will override the color and backgroundColor if provided
        };
      } else {
        // Add new item, with optional colors
        state.items.push(item);
      }
    },
    updateItemColors(state, action) {
      const { id, color, backgroundColor } = action.payload;
      const existingItemIndex = state.items.findIndex(i => i.id === id);

      if (existingItemIndex > -1) {
        // Update the color and backgroundColor of the item
        state.items[existingItemIndex] = {
          ...state.items[existingItemIndex],
          color,
          backgroundColor,
        };
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    resetItems(state) {
      state.items = [];
    },
  },
});

export const { addItem, updateItemColors, removeItem, resetItems } = droppedItemsSlice.actions;
export default droppedItemsSlice.reducer;
