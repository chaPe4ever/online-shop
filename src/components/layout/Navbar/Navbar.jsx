import CartMenuItem from '@/components/layout/Navbar/CartMenuItem';
import {
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { NavigationMenu } from '@radix-ui/react-navigation-menu';
import { Link } from 'react-router';
import UserAvatarMenuItem from './UserAvatarMenuItem';

const Navbar = () => {
  return (
    <>
      <NavigationMenu className="bg-background sticky top-0 z-999 rounded-2xl border-2 px-5 py-3 shadow-xl">
        <NavigationMenuList className="flex justify-between">
          <NavigationMenuItem>
            <Link to="/">
              <img src="vite.svg" />
            </Link>
          </NavigationMenuItem>
          <div className="flex gap-6">
            <UserAvatarMenuItem />
            <CartMenuItem />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
export default Navbar;
