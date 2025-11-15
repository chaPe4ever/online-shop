import Navbar from '@/components/layout/Navbar/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default MainLayout;
