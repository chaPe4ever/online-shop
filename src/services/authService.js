import { apiPropulsion } from './api/axios';
import { extractErrorMessage } from '../utils/error.utils';

export const authService = {
  verifyToken: async ({ token }) => {
    try {
      const res = await apiPropulsion.post('auth/token/verify/', { token });
      return res.data;
    } catch (error) {
      console.error(`Error verifying current token: ${error}`);
      throw new Error(extractErrorMessage(error));
    }
  },
  getToken: async ({ email, password }) => {
    try {
      const res = await apiPropulsion.post('auth/token/', { email, password });
      return res.data;
    } catch (error) {
      console.error(`Error authenticating user: ${error}`);
      throw new Error(extractErrorMessage(error));
    }
  },
  register: async ({ email }) => {
    try {
      const res = await apiPropulsion.post('auth/registration/', { email });
      return res.data;
    } catch (error) {
      console.error(`Error registering user: ${error}`);
      throw new Error(extractErrorMessage(error));
    }
  },
  verifyCode: async ({
    email,
    username,
    code,
    password,
    password_repeat,
    first_name,
    last_name,
  }) => {
    try {
      const res = await apiPropulsion.patch('auth/registration/validation/', {
        email,
        username,
        code,
        password,
        password_repeat,
        first_name,
        last_name,
      });
      return res.data;
    } catch (error) {
      console.error(`Error validating user: ${error}`);
      throw new Error(extractErrorMessage(error));
    }
  },
};
