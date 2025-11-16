import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Label } from '@/components/ui/label';

import { NavigationMenuItem } from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { selectCartItems } from '@/store/cart/cart.selector';

import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const CartMenuItem = () => {
  const [isCartPopoverOpen, setIsCartPopoverOpen] = useState(false);
  const cartItems = useSelector(selectCartItems);

  const handleCheckout = () => {
    // TODO impl checkout logic
    toast('Under construction!');
  };

  return (
    <NavigationMenuItem>
      <Popover open={isCartPopoverOpen} onOpenChange={setIsCartPopoverOpen}>
        <PopoverTrigger>
          <ShoppingCart className="h-8 w-8 hover:cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent className="my-4 flex h-100 min-w-2xs flex-col justify-between gap-2">
          {/* Scrollable items container */}
          <div className="flex-1 overflow-y-auto">
            {cartItems && cartItems.length > 0 ? (
              <div className="flex flex-col gap-4">
                {cartItems.map((cartItem) => (
                  <div key={cartItem.id + cartItem.title}>
                    <div className="mr-5 flex gap-5">
                      <img
                        className="h-15 w-15 object-contain"
                        src={cartItem.image}
                        alt={cartItem.title}
                      />
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
