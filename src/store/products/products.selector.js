import { createSelector } from 'reselect';

export const selectProducts = (state) => state.products.items;
export const selectProductsIsLoading = (state) => state.products.isLoading;
export const selectProductsError = (state) => state.products.error;

export const selectCategories = createSelector([selectProducts], (items) => {
  const result = {};
  items.forEach((i) => {
    if (!result[i.category]) {
      result[i.category] = {
        products: [],
      };
    }
    result[i.category] = {
      products: [...result[i.category].products, i],
    };
  });
  // Add bgImg property to each category, get image from first product
  Object.keys(result).forEach((category) => {
    const productsArray = result[category].products;
    result[category].bgImg =
      productsArray.length > 0 ? productsArray[0].image : null;
  });
  return result;
});

export const selectProductsByCategory = createSelector(
  [selectProducts, (_, category) => category],
  (items, category) => {
    if (!category) return [];
    // Case-insensitive matching
    const normalizedCategory = category.toLowerCase();
    return items.filter(
      (i) => i.category?.toLowerCase() === normalizedCategory
    );
  }
);
