import { createSlice } from '@reduxjs/toolkit';

const addCartItem = (cartItems, productToAdd) => {
  if (cartItems.find((cartItem) => cartItem.id == productToAdd.id)) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addProductToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
      //   const productToAdd = action.payload;
      //   const productExists = state.products.find(
      //     (p) => p.product.id === productToAdd.id
      //   );
      //   if (productExists) {
      //     state.products = state.products.map((p) =>
      //       p.id === productToAdd.id ? { ...p, quantity: p.quantity + 1 } : p
      //     );
      //   } else {
      //     state.products.push({
      //       product: productToAdd,
      //       quantity: 1,
      //     });
      //   }
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
