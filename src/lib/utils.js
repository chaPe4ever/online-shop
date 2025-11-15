import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { setErrorMsg, setIsLoading } from '@/store/auth/auth.reducer';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Helper function to extract error message from propulstion api response data
export function extractErrorMessage(error) {
  // Defensive check: Don't ever return an Error object, always string
  // Standard Axios error format
  if (error && error.response && error.response.data) {
    const data = error.response.data;

    // Common DRF non-field errors
    if (
      data.non_field_errors &&
      Array.isArray(data.non_field_errors) &&
      data.non_field_errors.length > 0
    ) {
      if (typeof data.non_field_errors[0] === 'string') {
        return data.non_field_errors[0];
      }
      try {
        return JSON.stringify(data.non_field_errors[0]);
      } catch {
        return 'An unknown error occurred.';
      }
    }

    // Handle data.detail as string or sensible fallback
    if (data.detail) {
      if (typeof data.detail === 'string') return data.detail;
      if (typeof data.detail === 'object') return JSON.stringify(data.detail);
      if (Array.isArray(data.detail)) return data.detail.join(', ');
    }

    // Try extracting the first error key value as a string
    const keys = Object.keys(data);
    if (keys.length > 0) {
      const firstKey = keys[0];
      const val = data[firstKey];
      if (Array.isArray(val) && val.length > 0) {
        if (typeof val[0] === 'string') {
          return val[0];
        }
        try {
          return JSON.stringify(val[0]);
        } catch {
          return 'An unknown error occurred.';
        }
      }
      if (typeof val === 'string') {
        return val;
      }
    }
  }

  // Plain response string
  if (error && error.response && typeof error.response === 'string') {
    return error.response;
  }

  // Direct string error (shouldn't happen w/ Axios)
  if (typeof error === 'string') {
    return error;
  }

  // If error is an Error object
  if (error instanceof Error) {
    return error.message || 'An unknown error occurred.';
  }

  // Attempt fallback to error.message if string
  if (error && typeof error.message === 'string') {
    return error.message;
  }

  return 'An unknown error occurred.';
}

// Helper function to extract error message from Fakestore api response data
export function extractFakestoreErrorMessage(error) {
  // Standard Axios error format
  if (error && error.response && error.response.data) {
    const data = error.response.data;

    // Handle data.detail as string or sensible fallback
    if (data.detail) {
      if (typeof data.detail === 'string') return data.detail;
      if (typeof data.detail === 'object') return JSON.stringify(data.detail);
      if (Array.isArray(data.detail)) return data.detail.join(', ');
    }

    // Try extracting the first error key value as a string
    const keys = Object.keys(data);
    if (keys.length > 0) {
      const firstKey = keys[0];
      const val = data[firstKey];
      if (Array.isArray(val) && val.length > 0) {
        if (typeof val[0] === 'string') {
          return val[0];
        }
        try {
          return JSON.stringify(val[0]);
        } catch {
          return 'An unknown error occurred.';
        }
      }
      if (typeof val === 'string') {
        return val;
      }
    }
  }

  // Plain response string
  if (error && error.response && typeof error.response === 'string') {
    return error.response;
  }

  // Direct string error (shouldn't happen w/ Axios)
  if (typeof error === 'string') {
    return error;
  }

  // If error is an Error object
  if (error instanceof Error) {
    return error.message || 'An unknown error occurred.';
  }

  // Attempt fallback to error.message if string
  if (error && typeof error.message === 'string') {
    return error.message;
  }

  return 'An unknown error occurred.';
}

export const tryCatch = async (dispatch, cb, options = {}) => {
  const { onError, onFinally, rethrow = false } = options;

  try {
    dispatch(setErrorMsg(null));
    dispatch(setIsLoading(true));
    return await cb();
  } catch (error) {
    // Extract the error message as a string
    const errorMessage = extractErrorMessage(error);

    if (onError) {
      onError(error);
    }

    dispatch(setErrorMsg(errorMessage)); // Use extracted string

    if (rethrow) {
      throw error;
    }
    return null;
  } finally {
    if (onFinally) {
      onFinally();
    }
    dispatch(setIsLoading(false));
  }
};
