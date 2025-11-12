import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { validateUser } from '@/lib/api';
import { Spinner } from '@/components/ui/spinner';

const ValidationPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [code, setCode] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(null);

  const handleValidationSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setIsLoading(true);
      const res = await validateUser({
        email,
        username,
        code,
        password,
        password_repeat: repeatPassword,
        first_name: firstName,
        last_name: lastName,
      });
      console.log('VALIDATION RESPONSE:', res);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginHere = () => {
    navigate('/auth/login');
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex w-1/2 flex-col items-center justify-center">
        <h1 className="text-2xl">Validation Page</h1>
        <form
          onSubmit={handleValidationSubmit}
          className="flex w-full flex-col gap-2"
        >
          <div>
            <Label className="mb-1">Email</Label>
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
            <Label className="mb-1">Username</Label>
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
            <Label className="mb-1">Password</Label>
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
            <Label className="mb-1">Repeat Password</Label>
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
            <Label className="mb-1">First Name</Label>
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
            <Label className="mb-1">Last Name</Label>
            <Input
              required
              name="last-name"
              placeholder="Last name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-1">Received code from email</Label>
            <Input
              required
              name="code"
              placeholder="Code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="mt-10 hover:bg-amber-100 md:cursor-pointer"
            variant="outline"
            size="sm"
          >
            Validate
            {isLoading && <Spinner />}
          </Button>
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

export default ValidationPage;
