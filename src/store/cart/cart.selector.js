import { createSelector } from 'reselect';

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) => {
    return cartItems && cartItems.length > 0
      ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
      : null;
  }
);

export const selectIsLoading = createSelector(
  [selectCartReducer],
  (cart) => cart.isLoading
);

export const selectError = createSelector(
  [selectCartReducer],
  (cart) => cart.error
);
