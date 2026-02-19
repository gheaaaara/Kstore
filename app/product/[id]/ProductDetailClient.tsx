"use client";

import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

interface CartItem extends Product {
  quantity: number;
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Pastiin object yang dikirim punya quantity (biar sesuai CartContext)
    addToCart({ ...product, quantity: 1 });
    // Optional: tambah alert/toast kalau mau, tapi sesuai request sebelumnya skip
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-md">
        <img
          src={product.image}
          alt={product.title}
          className="h-64 md:h-96 object-contain mx-auto"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-blue-600 text-2xl font-semibold mb-4">${product.price}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <p className="text-sm text-gray-500">
              Category: <span className="capitalize">{product.category}</span>
            </p>
            <p className="text-sm text-yellow-600 mt-2">
              Rating: {product.rating.rate} ⭐ ({product.rating.count} reviews)
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold mt-6 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}