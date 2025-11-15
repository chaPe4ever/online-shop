import { apiFakestore } from './api/axios';
import { extractFakestoreErrorMessage } from '../utils/error.utils';

export const productsService = {
  getAll: async (params) => {
    try {
      const res = await apiFakestore.get('products', { params });
      return res.data;
    } catch (error) {
      console.error(`Error fetcing products: ${error}`);
      throw new Error(extractFakestoreErrorMessage(error));
    }
  },
};
