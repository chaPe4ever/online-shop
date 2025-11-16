import axios from 'axios';
import { AuthLogger } from './auth.interceptor';
import { AxiosLogger } from './logger.interceptor';

// Fakestore API
export const apiFakestore = axios.create({
  baseURL: import.meta.env.VITE_FAKESTORE_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add logging to Fakestore API
apiFakestore.interceptors.request.use(AxiosLogger.requestLogger);
apiFakestore.interceptors.response.use(
  AxiosLogger.responseLogger,
  AxiosLogger.errorLogger
);

// Propulsion API (no auth)
export const apiPropulsion = axios.create({
  baseURL: import.meta.env.VITE_PROPULSION_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add logging to Propulsion API
apiPropulsion.interceptors.request.use(AxiosLogger.requestLogger);
apiPropulsion.interceptors.response.use(
  AxiosLogger.responseLogger,
  AxiosLogger.errorLogger
);

// Propulsion API that requires Bearer token
export const apiPropulsionAuth = axios.create({
  baseURL: import.meta.env.VITE_PROPULSION_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ATTACH MULTIPLE INTERCEPTORS
// Order matters: Auth interceptor runs first (adds token), then logger logs the request with token
apiPropulsionAuth.interceptors.request.use(AuthLogger.requestAuth);
apiPropulsionAuth.interceptors.request.use(AxiosLogger.requestLogger);

// For responses: Logger runs first, then auth error handler (for token refresh)
apiPropulsionAuth.interceptors.response.use(
  AxiosLogger.responseLogger,
  AxiosLogger.errorLogger
);
apiPropulsionAuth.interceptors.response.use(
  AuthLogger.responseAuth,
  AuthLogger.responseErrorAuth
);
