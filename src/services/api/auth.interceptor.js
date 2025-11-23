import { LocalStorageService } from '../LocalStorageService';
import { apiPropulsion } from './axios';

// Utility function for info logging
const logInfo = (message, data = null) => {
  console.log(
    `%cℹ️ ${message}`,
    'color: #2196F3; font-weight: bold',
    data || ''
  );
};

// Auth Logger Object (no request/response logging, only auth logic)
export const AuthLogger = {
  requestAuth: (config) => {
    const token = LocalStorageService.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  requestErrorAuth: (error) => {
    return Promise.reject(error);
  },

  responseAuth: (response) => {
    return response;
  },

  responseErrorAuth: async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = LocalStorageService.getRefreshToken();

      if (refreshToken) {
        try {
          logInfo('🔄 Attempting to refresh token...');

          // Request new access token using refresh token
          const res = await apiPropulsion.post('auth/token/refresh/', {
            refresh: refreshToken,
          });

          const { access } = res.data;
          LocalStorageService.setAccessToken(access);

          logInfo('✅ Token refreshed successfully');

          // Update Authorization header and retry original request
          originalRequest.headers.Authorization = `Bearer ${access}`;

          // Import the instance dynamically to avoid circular dependency
          const { apiPropulsionAuth } = await import('./axios');
          return apiPropulsionAuth(originalRequest);
        } catch (refreshError) {
          // Clear tokens and redirect to login
          LocalStorageService.clearAuthTokens();
          logInfo('🚪 Token refresh failed - redirecting to login...');
          window.location.href = '/auth/login';

          return Promise.reject(refreshError);
        }
      } else {
        logInfo('⚠️ No refresh token available - redirecting to login');
        LocalStorageService.clearAuthTokens();
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  },
};
