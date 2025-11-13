import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/store/auth/auth.reducer';
import {
  selectIsAuthenticated,
  selectIsLoading,
  selectUser,
} from '@/store/auth/auth.selector';
import { NavigationMenu } from '@radix-ui/react-navigation-menu';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router';

const NavigationHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleLogoutUser = async () => {
    dispatch(logout());
    setTimeout(() => setPopoverOpen(false), 200);
  };

  return (
    <>
      <NavigationMenu className="p-2">
        <NavigationMenuList className="flex flex-row justify-evenly">
          <NavigationMenuItem>
            <Link to="/">
              <img src="vite.svg" />
            </Link>
          </NavigationMenuItem>
          <div className="flex flex-1"></div>
          <div className="flex gap-4">
            <NavigationMenuItem>
              {isLoading ? (
                <Spinner className="size-5 h-full w-full" />
              ) : isAuthenticated && user ? (
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger>
                    <Avatar className="md:hover:cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="my-2 flex w-full flex-col items-center justify-center gap-2">
                    <Label className="font-black">{user && user.email}</Label>
                    <Button
                      onClick={handleLogoutUser}
                      className="w-full md:hover:cursor-pointer"
                      variant="outline"
                    >
                      Log out
                    </Button>
                  </PopoverContent>
                </Popover>
              ) : (
                <div>
                  <Link to="/auth/login">
                    <Button
                      variant="default"
                      className="md:hover:cursor-pointer"
                    >
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ShoppingCart className="h-8 w-8 hover:cursor-pointer" />
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      <Outlet />
    </>
  );
};
export default NavigationHeader;
