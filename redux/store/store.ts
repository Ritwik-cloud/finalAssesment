import { configureStore } from "@reduxjs/toolkit";
import grocerySlice from "@/redux/Slices/grocerySlice"; 
import { TypedUseSelectorHook, useSelector } from "react-redux";

//  Middleware to sync cart to localStorage
const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  const state = store.getState();
  
  // Save cart items to localStorage whenever state changes
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(state.Grocery.items));
  }
  
  return result;
};

export const store = configureStore({
  reducer: {
    Grocery: grocerySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
