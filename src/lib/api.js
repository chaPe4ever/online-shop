import axios from 'axios';
import {
  extractFakestoreErrorMessage,
  extractErrorMessage as extractPropulsionErrorMessage,
} from './utils';
import { LocalStorageService } from './LocalStorageService';

// Fakestore API
export const apiFakestore = axios.create({
  baseURL: import.meta.env.VITE_FAKESTORE_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Propulsion API
export const apiPropulsion = axios.create({
  baseURL: import.meta.env.VITE_PROPULSION_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiPropulsionAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptos

// Add access token to Authorization header if present
apiPropulsionAuth.interceptors.request.use(
  (config) => {
    const token = LocalStorageService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh on 401 errors
apiPropulsionAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = LocalStorageService.getRefreshToken();
      if (refreshToken) {
        try {
          // Request new access token using refresh token
          const res = await apiPropulsion.post('auth/token/refresh/', {
            refresh: refreshToken,
          });
          const { access } = res.data;
          LocalStorageService.setAccessToken(access);

          // Update Authorization header and retry original request
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return apiPropulsionAuth(originalRequest);
        } catch (error) {
          console.log(`Error refreshing token: ${error.message}`);
          // Clear access-refresh tokens from storage
          LocalStorageService.clearAuthTokens();
        }
      }
    }
    return Promise.reject(error);
  }
);

// Authentication
export const getAuthInfo = async ({ email, password }) => {
  try {
    const res = await apiPropulsion.post('auth/token/', { email, password });
    return res.data;
  } catch (error) {
    console.error(`Error authenticating user: ${error}`);
    throw new Error(extractPropulsionErrorMessage(error));
  }
};

export const verifyToken = async ({ token }) => {
  try {
    const res = await apiPropulsion.post('auth/token/verify/', { token });
    return res.data;
  } catch (error) {
    console.error(`Error verifying current token: ${error}`);
    throw new Error(extractPropulsionErrorMessage(error));
  }
};

export const registerUser = async ({ email }) => {
  try {
    const res = await apiPropulsion.post('auth/registration/', { email });
    return res.data;
  } catch (error) {
    console.error(`Error registering user: ${error}`);
    throw new Error(extractPropulsionErrorMessage(error));
  }
};

export const validateUser = async ({
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
    throw new Error(extractPropulsionErrorMessage(error));
  }
};

// Users
export const fetchMyUser = async () => {
  try {
    const res = await apiPropulsionAuth.get('users/me/');
    return res.data;
  } catch (error) {
    console.error(`Error fetchin my user: ${error}`);
    throw new Error(extractPropulsionErrorMessage(error));
  }
};

export const deleteMyUser = async () => {
  try {
    const res = await apiPropulsionAuth.delete('users/me/');
    return res.data;
  } catch (error) {
    console.error(`Error deleting my user: ${error}`);
    throw new Error(extractPropulsionErrorMessage(error));
  }
};

// Products
export const fetchProducts = async () => {
  try {
    const res = await apiPropulsionAuth.delete('products');
    return res.data;
  } catch (error) {
    console.error(`Error fetcing products: ${error}`);
    throw new Error(extractFakestoreErrorMessage(error));
  }
};
