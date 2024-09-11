import { configureStore } from '@reduxjs/toolkit';
import droppedItemsReducer from './droppedItemsSlice';

export const store = configureStore({
  reducer: {
    droppedItems: droppedItemsReducer,
  },
});
