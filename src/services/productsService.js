import { apiFakestore } from './api/axios';
import { extractFakestoreErrorMessage } from '../utils/error.utils';

export const productsService = {
  getAll: async () => {
    try {
      const res = await apiFakestore.get('products');
      return res.data;
    } catch (error) {
      console.error(`Error fetcing products: ${error}`);
      throw new Error(extractFakestoreErrorMessage(error));
    }
  },
};
