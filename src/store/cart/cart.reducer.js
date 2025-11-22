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

const decreaseCartProduct = (cartItems, productToDecrease) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToDecrease.id
  );

  if (!existingCartItem) {
    return cartItems;
  }

  // If quantity is 1, remove the item from cart
  if (existingCartItem.quantity === 1) {
    return removeCartProduct(cartItems, productToDecrease);
  }

  // Otherwise, decrease the quantity
  return cartItems.map((cartItem) =>
    cartItem.id === productToDecrease.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const increaseCartProduct = (cartItems, productToIncrease) => {
  return cartItems.map((cartItem) =>
    cartItem.id === productToIncrease.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addProductToCart(state, action) {
      state.cartItems = addCartProduct(state.cartItems, action.payload);
      state.isLoading = false;
      state.error = null;
    },
    removeProductFromCart(state, action) {
      state.cartItems = removeCartProduct(state.cartItems, action.payload);
      state.isLoading = false;
      state.error = null;
    },
    decreaseProductQuantity(state, action) {
      state.cartItems = decreaseCartProduct(state.cartItems, action.payload);
      state.isLoading = false;
      state.error = null;
    },
    increaseProductQuantity(state, action) {
      state.cartItems = increaseCartProduct(state.cartItems, action.payload);
      state.isLoading = false;
      state.error = null;
    },
    clearCart(state) {
      state.cartItems = [];
      state.isLoading = false;
      state.error = null;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  decreaseProductQuantity,
  increaseProductQuantity,
  clearCart,
  setIsLoading,
  setError,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
