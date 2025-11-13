import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { getAuthInfo } from '@/lib/api';
import { Spinner } from '@/components/ui/spinner';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store/auth/auth.reducer';
import { tryCatch } from '@/lib/utils';
import { selectErrorMsg, selectIsLoading } from '@/store/auth/auth.selector';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Selectors
  const errorMsg = useSelector(selectErrorMsg);
  const isLoading = useSelector(selectIsLoading);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await tryCatch(dispatch, async () => {
      const authInfo = await getAuthInfo({ email, password });
      dispatch(login(authInfo));
      navigate('/');
    });
  };

  const handleRegisterHere = () => {
    navigate('/auth/register');
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex w-1/2 flex-col items-center justify-center">
        <h1 className="mb-5 text-2xl">Login Page</h1>
        <form
          onSubmit={handleLoginSubmit}
          className="flex w-full flex-col gap-4"
        >
          <div>
            <Label className="mb-1.5">Email</Label>
            <Input
              required
              name="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-1.5">Password</Label>
            <Input
              required
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="mt-10 cursor-pointer"
            variant="outline"
            size="sm"
          >
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
            Register here
          </span>
        </Label>
      </div>
    </div>
  );
};

export default LoginPage;
