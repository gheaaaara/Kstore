"use client";

import { useCart } from "../../../context/CartContext"; 

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="px-8 py-10 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="h-80 object-contain" 
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-sm text-gray-500 mb-2 font-medium uppercase tracking-wider">
            {product.category}
          </p>
          <p className="text-3xl font-semibold text-blue-600 mb-4">
            ${product.price}
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>
          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}