"use client";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number; };
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // FIX: Tambahin quantity supaya TypeScript gak error lagi
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-md">
        <img src={product.image} alt={product.title} className="h-64 object-contain mx-auto" />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-blue-600 text-2xl font-semibold mb-4">${product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <button 
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}