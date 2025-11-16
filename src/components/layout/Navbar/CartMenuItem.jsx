import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Label } from '@/components/ui/label';

import { NavigationMenuItem } from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { removeProductFromCart } from '@/store/cart/cart.reducer';
import { selectCartCount, selectCartItems } from '@/store/cart/cart.selector';

import { ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const CartMenuItem = () => {
  const dispatch = useDispatch();
  const [isCartPopoverOpen, setIsCartPopoverOpen] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);

  const handleCheckout = () => {
    // TODO impl checkout logic
    toast('Under construction!');
  };

  const handleRemoveItemFromCart = (cartItem) => {
    dispatch(removeProductFromCart(cartItem));
  };

  return (
    <NavigationMenuItem>
      <Popover open={isCartPopoverOpen} onOpenChange={setIsCartPopoverOpen}>
        <PopoverTrigger>
          <div className="relative inline-block">
            <ShoppingCart className="h-8 w-8 hover:cursor-pointer" />
            {cartCount && (
              <span className="bg-destructive border-background text-background absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full border-0 text-xs font-bold select-none">
                {cartCount}
              </span>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="my-4 flex h-100 min-w-2xs flex-col justify-between gap-2">
          {/* Scrollable items container */}
          <div className="flex-1 overflow-y-auto">
            {cartItems && cartItems.length > 0 ? (
              <div className="flex flex-col gap-4">
                {cartItems.map((cartItem) => (
                  <div key={cartItem.id + cartItem.title}>
                    <div className="mr-5 flex gap-5">
                      <div className="relative">
                        <img
                          className="h-15 w-15 object-contain"
                          src={cartItem.image}
                          alt={cartItem.title}
                        />
                        <X
                          onClick={() => handleRemoveItemFromCart(cartItem)}
                          className="text-background hover:text-background/80 bg-foreground absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-2xl"
                          // size={22}
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <span className="line-clamp-2 text-xs">
                          {cartItem.title}
                        </span>
                        <span>
                          {cartItem.quantity} x ${cartItem.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-muted-foreground">Cart empty</span>
              </div>
            )}
          </div>

          {/* Fixed checkout button */}
          <Button
            disabled={!cartItems || cartItems.length === 0}
            onClick={handleCheckout}
            className="w-full hover:cursor-pointer"
            variant="outline"
          >
            Checkout
          </Button>
        </PopoverContent>
      </Popover>
    </NavigationMenuItem>
  );
};

export default CartMenuItem;
