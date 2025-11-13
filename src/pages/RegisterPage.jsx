import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { getAuthInfo, registerUser, validateUser } from '@/lib/api';
import { Spinner } from '@/components/ui/spinner';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { selectErrorMsg, selectIsLoading } from '@/store/auth/auth.selector';
import {
  login,
  logout,
  setErrorMsg,
  setIsLoading,
} from '@/store/auth/auth.reducer';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  // Selectors
  const error = useSelector(selectErrorMsg);
  const isLoading = useSelector(selectIsLoading);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setErrorMsg(null));
      dispatch(setIsLoading(true));
      await registerUser({ email });

      // Now show the dialog to get the validation code
      setTimeout(() => setDialogOpen(true), 360);
    } catch (error) {
      dispatch(setErrorMsg(error.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleLoginHere = () => {
    navigate('/auth/login');
  };

  const handleVerifyUser = async () => {
    try {
      dispatch(setErrorMsg(null));
      dispatch(setIsLoading(true));
      await validateUser({
        email,
        username,
        code,
        password,
        password_repeat: repeatPassword,
        first_name: firstName,
        last_name: lastName,
      });

      // Login new created user to store the info to the store
      const authInfo = await getAuthInfo({ email, password });
      // Logout any previously logged in user and clear store auth data
      dispatch(logout());
      dispatch(login(authInfo));

      // Now hide the dialog and navigate to home
      setDialogOpen(false);
      // Add slight delay in navigation after dialog is closed
      setTimeout(() => navigate('/'), 100);
    } catch (error) {
      dispatch(setErrorMsg(error.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex w-1/2 flex-col items-center justify-center">
        <h1 className="mb-5 text-2xl">Registration Page</h1>
        <form
          onSubmit={handleRegisterSubmit}
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
            <Label className="mb-1.5">Username</Label>
            <Input
              required
              name="username"
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <div>
            <Label className="mb-1.5">Repeat Password</Label>
            <Input
              required
              name="reapeat-password"
              placeholder="Repeat password"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-1.5">First Name</Label>
            <Input
              required
              name="first-name"
              placeholder="First name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-1.5">Last Name</Label>
            <Input
              required
              name="last-name"
              placeholder="Last name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="mt-10 cursor-pointer"
            variant="outline"
            size="sm"
          >
            Register
            {isLoading && <Spinner />}
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Verification Code</DialogTitle>
                <DialogDescription>
                  Give in the verification code you received in your email.
                  Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="code" className="text-right">
                    Code
                  </Label>
                  <Input
                    required
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleVerifyUser} type="submit">
                  Verify yourself
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
            Login here
          </span>
        </Label>
      </div>
    </div>
  );
};

export default RegisterPage;
