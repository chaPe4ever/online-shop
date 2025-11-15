import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';

function ProductCard({ product }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 100; // Characters to show before truncating

  const shouldTruncate = product.description.length > MAX_LENGTH;
  const displayText = isExpanded
    ? product.description
    : product.description.slice(0, MAX_LENGTH);

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent>
        <img
          className="h-50 w-full object-contain"
          src={product.image}
          alt={product.title}
        />
      </CardContent>
      <CardFooter className="flex-col gap-2">
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
        <Button className="cursor-pointer">Add to cart</Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
