import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Helper function to extract error message from response data
export function extractErrorMessage(error) {
  if (error.response && error.response.data) {
    const data = error.response.data;
    if (
      data.non_field_errors &&
      Array.isArray(data.non_field_errors) &&
      data.non_field_errors.length > 0
    ) {
      return data.non_field_errors[0];
    }
    if (data.detail) {
      return typeof data.detail === 'string'
        ? data.detail
        : JSON.stringify(data.detail);
    }
    const firstKey = Object.keys(data)[0];
    if (
      firstKey &&
      Array.isArray(data[firstKey]) &&
      data[firstKey].length > 0
    ) {
      return data[firstKey][0];
    }
  }
  return error.message;
}
