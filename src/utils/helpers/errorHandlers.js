import { setErrorMsg, setIsLoading } from '@/store/auth/auth.reducer';
import { extractErrorMessage } from '../error.utils';

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
