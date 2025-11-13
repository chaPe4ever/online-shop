import axios from 'axios';
import { extractErrorMessage } from './utils';
import { LocalStorageService } from './LocalStorageService';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add access token to Authorization header if present
apiAuth.interceptors.request.use(
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
apiAuth.interceptors.response.use(
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
          const res = await api.post('auth/token/refresh/', {
            refresh: refreshToken,
          });
          const { access } = res.data;
          LocalStorageService.setAccessToken(access);

          // Update Authorization header and retry original request
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return apiAuth(originalRequest);
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
    const res = await api.post('auth/token/', { email, password });
    return res.data;
  } catch (error) {
    console.error(`Error authenticating user: ${error}`);
    throw new Error(extractErrorMessage(error));
  }
};

export const verifyToken = async ({ token }) => {
  try {
    const res = await api.post('auth/token/verify/', { token });
    return res.data;
  } catch (error) {
    console.error(`Error verifying current token: ${error}`);
    throw new Error(extractErrorMessage(error));
  }
};

export const registerUser = async ({ email }) => {
  try {
    const res = await api.post('auth/registration/', { email });
    return res.data;
  } catch (error) {
    console.error(`Error registering user: ${error}`);
    throw new Error(extractErrorMessage(error));
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
    const res = await api.patch('auth/registration/validation/', {
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
};

// Users
export const fetchMyUser = async () => {
  try {
    const res = await apiAuth.get('users/me/');
    return res.data;
  } catch (error) {
    console.error(`Error fetchin my user: ${error}`);
    throw new Error(extractErrorMessage(error));
  }
};

export const deleteMyUser = async () => {
  try {
    const res = await apiAuth.delete('users/me/');
    return res.data;
  } catch (error) {
    console.error(`Error deleting my user: ${error}`);
    throw new Error(extractErrorMessage(error));
  }
};
