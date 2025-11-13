import axios from 'axios';
import { extractErrorMessage } from './utils';

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
    const token = localStorage.getItem('accessToken');
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
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          // Request new access token using refresh token
          const res = await api.post('auth/token/refresh/', {
            refresh: refreshToken,
          });
          const { access } = res.data;
          localStorage.setItem('accessToken', access);

          // Update Authorization header and retry original request
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return apiAuth(originalRequest);
        } catch (error) {
          console.log(`Error refreshing token: ${error.message}`);
          // Clear tokens and maybe handle logout here
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
    }
    return Promise.reject(error);
  }
);

export const getAuthInfo = async ({ email, password }) => {
  try {
    const res = await api.post('auth/token/', { email, password });
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error logging in user: ${extractErrorMessage(error)}`);
  }
};

export const verifyToken = async ({ token }) => {
  try {
    const res = await api.post('auth/token/verify/', { token });
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Error verifying current token: ${extractErrorMessage(error)}`
    );
  }
};

export const registerUser = async ({ email }) => {
  try {
    const res = await api.post('auth/registration/', { email });
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error registering user: ${extractErrorMessage(error)}`);
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
    console.error(error);

    throw new Error(`Error validating user: ${extractErrorMessage(error)}`);
  }
};

// Users
export const fetchMyUser = async () => {
  try {
    const res = await apiAuth.get('users/me/');
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error fetchin my user: ${extractErrorMessage(error)}`);
  }
};
