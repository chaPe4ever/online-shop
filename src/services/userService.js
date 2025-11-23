import { apiPropulsionAuth } from './api/axios';
import { extractErrorMessage } from '../utils/error.utils';

export const userService = {
  get: async () => {
    try {
      const res = await apiPropulsionAuth.get('users/me/');
      return res.data;
    } catch (error) {
      console.error(`Error fetchin my user: ${error.message}`, error);
      throw new Error(extractErrorMessage(error));
    }
  },
  delete: async () => {
    try {
      const res = await apiPropulsionAuth.delete('users/me/');
      return res.data;
    } catch (error) {
      console.error(`Error deleting my user: ${error.message}`, error);
      throw new Error(extractErrorMessage(error));
    }
  },
};
