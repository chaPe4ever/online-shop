import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { getAuthInfo } from '@/lib/api';
import { Spinner } from '@/components/ui/spinner';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store/auth/auth.reducer';
import { tryCatch } from '@/lib/utils';
import { selectErrorMsg, selectIsLoading } from '@/store/auth/auth.selector';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    setFocus('email');
  }, []);

  // Selectors
  const errorMsg = useSelector(selectErrorMsg);
  const isLoading = useSelector(selectIsLoading);

  // Handlers
  const onLoginSubmit = async (data) => {
    const { email, password } = data;
    await tryCatch(dispatch, async () => {
      const authInfo = await getAuthInfo({ email, password });
      dispatch(login(authInfo));
      navigate('/');
      toast('Succesfully logged in!');
    });
  };

  const handleRegisterHere = () => {
    tryCatch(dispatch, () => navigate('/auth/register'));
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex w-1/2 flex-col items-center justify-center">
        <h1 className="mb-5 text-2xl">Login Page</h1>
        <form
          onSubmit={handleSubmit(onLoginSubmit)}
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
          <Button type="submit" className="mt-10 cursor-pointer" size="sm">
            Login
            {isLoading && <Spinner />}
          </Button>
        </form>
        {errorMsg && <Label className="mt-3 text-rose-500">{errorMsg} </Label>}
        <Label className="items-star mt-4 justify-start font-extralight">
          Don't you have an account?
          <span
            className="font-bold md:cursor-pointer"
            onClick={handleRegisterHere}
          >
            Register
          </span>
        </Label>
      </div>
    </div>
  );
};

export default LoginPage;
