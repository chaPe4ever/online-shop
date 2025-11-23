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
    <Card className="flex h-full w-full flex-col">
      <CardContent className="flex flex-1 flex-col gap-2">
        <img
          className="h-50 w-full shrink-0 object-contain"
          src={product.image}
          alt={product.title}
        />
        <CardTitle className="line-clamp-2">{product.title}</CardTitle>
        <CardDescription className="flex-1">
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
      </CardContent>
      <CardFooter className="mt-auto">
        <Button onClick={handleOnAddToCart} className="w-full cursor-pointer">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
