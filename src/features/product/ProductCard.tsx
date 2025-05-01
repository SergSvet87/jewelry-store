import { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';

const ProductCard = ({ product }: { product: Product }) => {
  const addToCart = useCartStore(state => state.addToCart);

  return (
    <div className="border p-4 rounded-xl shadow">
      <img src={product.image} alt={product.title} className="mb-2 w-full" />
      <h2 className="font-medium text-lg">{product.title}</h2>
      <p className="text-sm text-gray-500">{product.description}</p>
      <p className="font-semibold text-md mt-2">${product.price}</p>
      <button
        className="mt-2 bg-black text-white py-1 px-3 rounded"
        onClick={() => addToCart(product.id)}
      >
        Add to cart
      </button>
    </div>
  );
}

export default ProductCard