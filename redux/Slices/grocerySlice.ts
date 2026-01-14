import { GroceryState, Item } from "@/typeScript/grocery.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const isBrowser = typeof window !== "undefined";




const initialState: GroceryState = {
  items: isBrowser
    ? JSON.parse(localStorage.getItem("cart") || "[]")
    : [],
  history: [],
  coupon: "",
};

const grocerySlice = createSlice({
  name: "grocery",
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<Item>) {
      state.history.push([...state.items]);

      const exists = state.items.find(
        (i) => i.id === action.payload.id
      );

      if (exists) {
        state.items = state.items.filter(
          (i) => i.id !== action.payload.id
        );
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    
    incrementItem(state, action: PayloadAction<number>) {
      state.history.push([...state.items]);
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementItem(state, action: PayloadAction<number>) {
      state.history.push([...state.items]);
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    applyCoupon(state, action: PayloadAction<string>) {
      state.coupon = action.payload;
    },

    undo(state) {
      if (state.history.length > 0) {
        const previousState = state.history.pop();
        if (previousState) {
          state.items = previousState;
        }
      }
    },
  },
});

export const { toggleItem, incrementItem, decrementItem, applyCoupon, undo } = grocerySlice.actions;
export default grocerySlice;