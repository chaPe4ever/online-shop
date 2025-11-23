import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth/auth.reducer';
import { cartReducer } from './cart/cart.reducer';
import { productsReducer } from './products/products.reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productsReducer,
});
