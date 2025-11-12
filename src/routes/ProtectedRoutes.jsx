import { useSelector } from 'react-redux';
import { useLocation, Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.user.accessToken);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
