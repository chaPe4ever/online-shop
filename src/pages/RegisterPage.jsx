import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { registerUser } from '@/lib/api';
import { Spinner } from '@/components/ui/spinner';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(null);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setIsLoading(true);
      await registerUser({ email });
      navigate('/auth/validation');
    } catch (error) {
      setError(error);
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
        <h1 className="text-2xl">Register Page</h1>
        <form
          onSubmit={handleRegisterSubmit}
          className="flex w-full flex-col gap-2"
        >
          {/* TODO add validation form here and add dialog to add the email code to proceed */}
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
          <Button
            type="submit"
            className="mt-10 hover:bg-amber-100 md:cursor-pointer"
            variant="outline"
            size="sm"
          >
            Register
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

export default RegisterPage;
