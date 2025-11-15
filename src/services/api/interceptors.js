import { LocalStorageService } from '../LocalStorageService';
import { apiPropulsion } from './axios';

// REQUEST INTERCEPTOR FUNCTION
export const authRequestInterceptor = (config) => {
  const token = LocalStorageService.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log('Request Headers:', config.headers);
  console.log('Request URL:', config.url);

  return config;
};

// REQUEST ERROR INTERCEPTOR FUNCTION
export const authRequestErrorInterceptor = (error) => {
  console.error('Request Error:', error);
  return Promise.reject(error);
};

// RESPONSE INTERCEPTOR FUNCTION
export const authResponseInterceptor = (response) => {
  // Just return the response for successful requests
  return response;
};

// RESPONSE ERROR INTERCEPTOR FUNCTION (with token refresh logic)
export const authResponseErrorInterceptor = async (error) => {
  console.log('Interceptor Response Error:', error.response?.status);

  const originalRequest = error.config;

  // Check if error is 401 and we haven't retried yet
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const refreshToken = LocalStorageService.getRefreshToken();

    if (refreshToken) {
      try {
        console.log('Attempting to refresh token...');

        // Request new access token using refresh token
        const res = await apiPropulsion.post('auth/token/refresh/', {
          refresh: refreshToken,
        });

        const { access } = res.data;
        LocalStorageService.setAccessToken(access);

        console.log('Token refreshed successfully');

        // Update Authorization header and retry original request
        originalRequest.headers.Authorization = `Bearer ${access}`;

        // Import the instance dynamically to avoid circular dependency
        const { apiPropulsionAuth } = await import('./axios');
        return apiPropulsionAuth(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError.message);

        // Clear tokens and redirect to login
        LocalStorageService.clearAuthTokens();
        window.location.href = '/auth/login';

        return Promise.reject(refreshError);
      }
    } else {
      console.log('No refresh token available');
      LocalStorageService.clearAuthTokens();
      window.location.href = '/auth/login';
    }
  }

  return Promise.reject(error);
};
