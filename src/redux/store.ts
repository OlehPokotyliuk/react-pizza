import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice.ts';
import cart from './slices/cartSlice.ts';
import pizza from './slices/pizzaSlice.ts';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type Rootstate = ReturnType<typeof store.getState>