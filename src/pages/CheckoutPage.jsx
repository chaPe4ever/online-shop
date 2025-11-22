import {
  selectCartItems,
  selectError,
  selectIsLoading,
} from '@/store/cart/cart.selector';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutProduct from '@/components/CheckoutProduct';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { clearCart, setError } from '@/store/cart/cart.reducer';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { setIsLoading } from '@/store/auth/auth.reducer';
import { tryCatch } from '@/utils/helpers/errorHandlers';
import { extractErrorMessage } from '@/utils/error.utils';
const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItems);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLoading) return <Spinner />;
  if (error) return <Label>{error.message}</Label>;

  if (cartItems.length === 0) {
    return <div>No items in cart</div>;
  }

  // Calculate total of all products
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayNow = async () => {
    dispatch(setIsLoading(true));
    // Add artificial delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    tryCatch(
      dispatch,
      async () => {
        toast.success('Payment successful! Thank you for your purchase!');
        navigate('/');
        dispatch(clearCart());
      },
      {
        onError: (error) => {
          dispatch(setError(extractErrorMessage(error)));
        },
      }
    );
  };

  return (
    <div className="flex h-full flex-col gap-8 p-5">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <div className="flex flex-col gap-4">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border px-2 py-1">Image</th>
              <th className="border px-2 py-1">Title</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Quantity</th>
              <th className="border px-2 py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <CheckoutProduct key={item.id} product={item} />
            ))}
            <tr>
              <td colSpan="4" className="px-2 py-2 text-right font-bold">
                Total:
              </td>
              <td className="border-t-2 border-gray-400 px-2 py-2 font-bold">
                CHF {total.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-5 flex justify-end">
          <Button className="w-auto cursor-pointer" onClick={handlePayNow}>
            Pay now
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
