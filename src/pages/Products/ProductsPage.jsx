import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import {
  selectCategories,
  selectProductsError,
  selectProductsIsLoading,
} from '@/store/products/products.selector';
import { Link } from 'react-router';

const ProductsPage = () => {
  // const { data: products, isLoading, error } = useProducts();
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectProductsIsLoading);
  const error = useSelector(selectProductsError);

  if (isLoading) return <Spinner />;
  if (error) return <Label>{error.message}</Label>;

  return (
    <div className="flex h-full flex-col gap-8 p-5">
      {categories &&
        Object.entries(categories).map(([k, v]) => (
          <div key={k} className="flex flex-col gap-4">
            <Link to={`/products/${k}`}>
              <h2 className="text-start text-xl font-bold md:cursor-pointer">
                {k.toUpperCase()}
              </h2>
            </Link>
            <div className="grid grid-cols-1 gap-4 pb-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {v.products.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
export default ProductsPage;
