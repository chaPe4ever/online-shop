import { MinusCircle, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import {
  decreaseProductQuantity,
  increaseProductQuantity,
} from '@/store/cart/cart.reducer';

const CheckoutProduct = ({ product = {} }) => {
  const dispatch = useDispatch();
  const handleDecreaseQuantity = () => {
    dispatch(decreaseProductQuantity(product));
  };
  const handleIncreaseQuantity = () => {
    dispatch(increaseProductQuantity(product));
  };

  return (
    <tr>
      <td className="border px-2 py-5">
        <img
          src={product.image}
          alt={product.title}
          className="mx-auto block h-15 w-15 object-contain"
        />
      </td>
      <td className="border px-2 py-1">{product.title}</td>
      <td className="border px-2 py-1">{product.price}</td>
      <td className="border px-2 py-1 align-middle">
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" onClick={handleDecreaseQuantity}>
            <MinusCircle />
          </Button>
          {product.quantity}
          <Button variant="outline" size="sm" onClick={handleIncreaseQuantity}>
            <PlusCircle />
          </Button>
        </div>
      </td>

      <td className="border px-2 py-1">
        {(product.price * product.quantity).toFixed(2)}
      </td>
    </tr>
  );
};

export default CheckoutProduct;
