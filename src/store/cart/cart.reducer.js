import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
  },
  reducers: {
    addProductToCart(state, action) {
      state.products.push(action.payload);
    },
    removeProductFromCart(state, action) {
      const productToRemove = action.payload;
      state.products = state.products.filter(
        (p) => p.id !== productToRemove.id
      );
    },
  },
});

export const { addProductToCart, removeProductFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
