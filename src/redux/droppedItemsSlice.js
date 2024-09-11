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
        state.items[existingItemIndex] = item;
      } else {
        state.items.push(item);
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

export const { addItem, removeItem, resetItems } = droppedItemsSlice.actions;
export default droppedItemsSlice.reducer;
