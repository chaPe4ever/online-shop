import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '@/store/cart/cart.reducer';
import { toast } from 'sonner';

function ProductCard({ product }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 100; // Characters to show before truncating
  const dispatch = useDispatch();

  const shouldTruncate = product.description.length > MAX_LENGTH;
  const displayText = isExpanded
    ? product.description
    : product.description.slice(0, MAX_LENGTH);

  function handleOnAddToCart() {
    dispatch(addProductToCart(product));
    toast(`Succesfully added ${product.title} to cart !`);
  }

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent>
        <img
          className="h-50 w-full object-contain"
          src={product.image}
          alt={product.title}
        />
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-end gap-4">
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>
          {displayText}
          {shouldTruncate && !isExpanded && '...'}
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-muted-foreground foreground hover:text-muted-foreground ml-1 cursor-pointer font-semibold opacity-70 hover:opacity-100"
            >
              {isExpanded ? 'less' : 'more'}
            </button>
          )}
        </CardDescription>
        <CardTitle>CHF {product.price}</CardTitle>
        <Button onClick={handleOnAddToCart} className="cursor-pointer">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
