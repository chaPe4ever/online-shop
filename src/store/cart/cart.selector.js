import { createSelector } from 'reselect';

const selectCartReducer = (state) => state.cart;

export const selectCartProducts = createSelector(
  [selectCartReducer],
  (cart) => cart.products
);
