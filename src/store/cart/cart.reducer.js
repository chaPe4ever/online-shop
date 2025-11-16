import { createSlice } from '@reduxjs/toolkit';

const addCartProduct = (cartItems, productToAdd) => {
  if (cartItems.find((cartItem) => cartItem.id == productToAdd.id)) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartProduct = (cartItems, productToRemove) => {
  return cartItems.filter((i) => i.id !== productToRemove.id);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addProductToCart(state, action) {
      state.cartItems = addCartProduct(state.cartItems, action.payload);
    },
    removeProductFromCart(state, action) {
      state.cartItems = removeCartProduct(state.cartItems, action.payload);
    },
  },
});

export const { addProductToCart, removeProductFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
