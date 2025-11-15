import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { userService } from '@/services/userService';
import { logout } from '@/store/auth/auth.reducer';
import {
  selectIsAuthenticated,
  selectIsLoading,
  selectUser,
} from '@/store/auth/auth.selector';
import { tryCatch } from '@/utils/helpers/errorHandlers';
import { NavigationMenu } from '@radix-ui/react-navigation-menu';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router';
import { toast } from 'sonner';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleLogoutUser = async () => {
    await tryCatch(dispatch, () => {
      dispatch(logout());
      setTimeout(() => setIsPopoverOpen(false), 200);
      toast('Succesfully logged out!');
    });
  };

  const handleDeleteUserAcc = async () => {
    await tryCatch(dispatch, async () => {
      await userService.delete();
      dispatch(logout());
      toast('Succesfully deleted your account!');
    });
  };

  return (
    <>
      <NavigationMenu className="bg-background sticky top-0 z-999 rounded-2xl border-2 px-5 py-3 shadow-xl">
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
                <div>
                  <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger>
                      <Avatar className="hover:cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="my-2 flex w-full flex-col items-center justify-center gap-2">
                      <Label className="mb-2 font-black">
                        {user && user.email}
                      </Label>
                      <Button
                        onClick={handleLogoutUser}
                        className="w-full hover:cursor-pointer"
                        variant="outline"
                      >
                        Log out
                      </Button>
                      <Button
                        className="w-full hover:cursor-pointer"
                        variant="destructive"
                        onClick={() => {
                          setIsPopoverOpen(false);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        Delete account
                      </Button>
                    </PopoverContent>
                  </Popover>
                  <Dialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                  >
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Delete account</DialogTitle>
                        <DialogDescription>
                          Are you susre you want to delete your acc. By deleting
                          your account you confirm that you'll lose access to
                          it. After deletion, there is no way to recover it
                          back.
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter>
                        <Button onClick={() => setIsDeleteDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteUserAcc}
                        >
                          Delete
                          {isLoading && <Spinner />}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <div>
                  <Link to="/auth/login">
                    <Button variant="default" className="hover:cursor-pointer">
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
    </>
  );
};
export default Navbar;
