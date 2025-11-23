import { Spinner } from '@/components/ui/spinner';
import { fetchProducts } from '@/store/products/products.reducer';
import {
  selectCategories,
  selectProductsError,
  selectProductsIsLoading,
} from '@/store/products/products.selector';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './Products/ProductCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router';

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectProductsIsLoading);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4 p-5">
      {categories &&
        Object.entries(categories).map(([k, v]) => (
          <Link to={`/products/${k}`}>
            <h2 className="text-start text-xl font-bold">{k.toUpperCase()}</h2>
            <Card
              key={k}
              className="relative h-60 w-full items-start justify-baseline overflow-hidden transition-all duration-300 hover:scale-102"
            >
              {/* Background image */}
              {v.bgImg && (
                <img
                  src={v.bgImg}
                  alt={`${k} background`}
                  className="pointer-events-none absolute inset-0 h-full w-full object-contain p-5 opacity-50"
                />
              )}
            </Card>
          </Link>
        ))}
    </div>
  );
};
export default HomePage;
