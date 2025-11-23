import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <>
      <h1 className="my-3 text-xl font-bold">
        The page you're looking for doesn't exist
      </h1>
      <Link to="/">
        <Button variant="secondary" className="md:cursor-pointer">
          Go back home
        </Button>
      </Link>
    </>
  );
};
export default NotFoundPage;
