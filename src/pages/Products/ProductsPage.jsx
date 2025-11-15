import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useProducts } from '@/hooks/products/useProducts';
import ProductCard from './ProductCard';

const ProductsPage = () => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) <Spinner />;
  if (error) <Label>{error.message}</Label>;
  return (
    <div className="flex h-full items-center justify-center p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
export default ProductsPage;
