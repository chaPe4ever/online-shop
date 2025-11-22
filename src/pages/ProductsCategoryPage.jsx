import { useSelector, useDispatch } from 'react-redux';
import {
  selectProductsByCategory,
  selectProductsIsLoading,
  selectProductsError,
} from '@/store/products/products.selector';
import { useParams } from 'react-router';
import ProductCard from './Products/ProductCard';
import { useMemo, useEffect } from 'react';
import { fetchProducts } from '@/store/products/products.reducer';
import { Spinner } from '@/components/ui/spinner';
import { Label } from '@/components/ui/label';

const ProductsCategoryPage = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const isLoading = useSelector(selectProductsIsLoading);
  const error = useSelector(selectProductsError);

  // Decode URL parameter and normalize to lowercase for matching
  const normalizedCategory = useMemo(
    () => (category ? decodeURIComponent(category).toLowerCase() : null),
    [category]
  );

  const products = useSelector((state) =>
    selectProductsByCategory(state, normalizedCategory)
  );

  useEffect(() => {
    // Fetch products if not already loaded
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) return <Spinner />;
  if (error) return <Label>{error.message}</Label>;

  return (
    <div className="flex h-full flex-col gap-8 p-5">
      <h1 className="text-2xl font-bold">{category?.toUpperCase()}</h1>
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 pb-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
export default ProductsCategoryPage;
