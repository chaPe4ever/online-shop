import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { getAuthInfo, registerUser, validateUser } from '@/lib/api';
import { Spinner } from '@/components/ui/spinner';
import { Dialog } from '@radix-ui/react-dialog';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { selectErrorMsg, selectIsLoading } from '@/store/auth/auth.selector';
import { login, logout } from '@/store/auth/auth.reducer';
import { tryCatch } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import {
  LocalStorageKeys,
  LocalStorageService,
} from '@/lib/LocalStorageService';

const RegisterPage = () => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRestoreRegistration, setIsRestoreRegistration] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setFocus,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      code: '',
    },
  });

  useEffect(() => {
    setFocus('email');
    const isRegisterRestorationActive = LocalStorageService.has(
      LocalStorageKeys.RESTORE_REGISTRATION
    );
    console.log('RESTORATION:', isRegisterRestorationActive);

    if (isRegisterRestorationActive) {
      setIsRestoreRegistration(true);
    }
  }, []);

  // Watch password for confirmation validation
  const password = watch('password');

  // Selectors
  const error = useSelector(selectErrorMsg);
  const isLoading = useSelector(selectIsLoading);

  // Handlers
  const handleRestoreRegistration = () => {
    const registrationRestorationData =
      LocalStorageService.getRestoreRegistration();

    if (registrationRestorationData) {
      // Check the case that ther was an error at verification code process and user updated form field e.g. email is taken
      const isFormFieldPrefilled = getValues();
      if (!isFormFieldPrefilled) {
        // Populate form with restoration data
        reset(registrationRestorationData);
      }

      setIsDialogOpen(true);
    }
  };

  const handleLoginHere = () => {
    tryCatch(dispatch, () => navigate('/auth/login'));
  };

  const handleVerifyUser = async () => {
    const { email, username, password, firstName, lastName, code } =
      getValues();

    tryCatch(
      dispatch,
      async () => {
        await validateUser({
          email,
          username,
          code,
          password,
          password_repeat: password,
          first_name: firstName,
          last_name: lastName,
        });
        // Login new created user to store the info to the store
        const authInfo = await getAuthInfo({ email, password });
        // Logout any previously logged in user and clear store auth data
        dispatch(logout());
        dispatch(login(authInfo));
        // clear registration restoration data
        LocalStorageService.removeRestoreRegistration();
        // Clear all form fields
        reset();

        // Add slight delay in navigation after dialog is closed
        setTimeout(() => navigate('/'), 100);
      },
      {
        onFinally: () => {
          // Hide the dialog
          setTimeout(() => setIsDialogOpen(false), 360);
        },
      }
    );
  };

  const onRegisterSubmit = (data) => {
    const { email } = data;
    tryCatch(dispatch, async () => {
      await registerUser({ email });
      LocalStorageService.setRestoreRegistration(data);
      // Now show the dialog to get the validation code
      setTimeout(() => setIsDialogOpen(true), 360);
    });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex w-1/2 flex-col items-center justify-center">
        <h1 className="mb-5 text-2xl">Registration Page</h1>
        <form
          onSubmit={handleSubmit(onRegisterSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <div className="flex flex-col items-start gap-1">
            <Input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-destructive px-1 text-xs">
                *{errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start gap-1">
            <Input
              {...register('username', {
                required: 'Username is required',
              })}
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="text-destructive px-1 text-xs">
                *{errors.username.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start gap-1">
            <Input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-destructive px-1 text-xs">
                *{errors.password.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start gap-1">
            <Input
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p className="text-destructive px-1 text-xs">
                *{errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start gap-1">
            <Input
              {...register('firstName', {
                required: 'First name is required',
              })}
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <p className="text-destructive px-1 text-xs">
                *{errors.firstName.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start gap-1">
            <Input
              {...register('lastName', {
                required: 'Last name is required',
              })}
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <p className="text-destructive px-1 text-xs">
                *{errors.lastName.message}
              </p>
            )}
          </div>

          <Button type="submit" className="mt-10 cursor-pointer" size="sm">
            Register
            {isLoading && <Spinner />}
          </Button>
          {isRestoreRegistration && (
            <Button
              className="cursor-pointer"
              onClick={handleRestoreRegistration}
              type="button"
              variant="outline"
            >
              Restore registration
              {isLoading && <Spinner />}
            </Button>
          )}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Verification Code</DialogTitle>
                <DialogDescription>
                  Give in the verification code you received in your email.
                  Click verify when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-start gap-1">
                <Input
                  {...register('code', {
                    // Only required when dialog is open to allow pass validation of the first step fields
                    required: isDialogOpen ? 'The code is required' : false,
                  })}
                  placeholder="Enter verification code"
                />
                {errors.code && (
                  <p className="text-destructive px-1 text-xs">
                    *{errors.code.message}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button onClick={handleVerifyUser} type="button">
                  Verify
                  {isLoading && <Spinner />}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
        <Label className="mt-3 text-rose-500">{error} </Label>
        <Label className="items-star mt-4 justify-start font-extralight">
          Have already an account?
          <span
            className="font-bold md:cursor-pointer"
            onClick={handleLoginHere}
          >
            Login
          </span>
        </Label>
      </div>
    </div>
  );
};

export default RegisterPage;
