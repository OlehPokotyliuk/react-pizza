import { configureStore } from '@reduxjs/toolkit'
import filter from './filter/slice.ts';
import cart from './cart/slice.ts';
import pizza from './pizza/slice.ts';
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