import axios from 'axios';
import {
  authRequestErrorInterceptor,
  authRequestInterceptor,
  authResponseErrorInterceptor,
  authResponseInterceptor,
} from './interceptors';

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

// Propulsion API that required Bearer token
export const apiPropulsionAuth = axios.create({
  baseURL: import.meta.env.VITE_PROPULSION_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ATTACH INTERCEPTORS IMMEDIATELY
apiPropulsionAuth.interceptors.request.use(
  authRequestInterceptor,
  authRequestErrorInterceptor
);

apiPropulsionAuth.interceptors.response.use(
  authResponseInterceptor,
  authResponseErrorInterceptor
);
