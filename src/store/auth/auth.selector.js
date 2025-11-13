import { createSelector } from 'reselect';

const selectAuthReducer = (state) => state.auth;

export const selectUser = createSelector([selectAuthReducer], (auth) => {
  console.log(auth);
  return auth.user;
});

export const selectIsAuthenticated = createSelector(
  [selectAuthReducer],
  (auth) => Boolean(auth.accessToken)
);

export const selectIsLoading = createSelector([selectAuthReducer], (auth) =>
  Boolean(auth.isLoading)
);

export const selectErrorMsg = createSelector(
  [selectAuthReducer],
  (auth) => auth.errorMsg
);
