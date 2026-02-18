"use client"

import { useCart } from "../../../context/CartContext"

interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
  category: string
  rating: {
    rate: number
    count: number
  }
}

export default function ProductDetailClient({
  product,
}: {
  product: Product
}) {
  const { addToCart } = useCart()

  return (
    <div className="px-8 py-10 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-lg">
        <img
          src={product.image}
          alt={product.title}
          className="h-80 object-contain"
        />

        <div>
          <h1 className="text-2xl font-bold mb-4">
            {product.title}
          </h1>

          <p className="text-yellow-500 mb-2">
            ⭐ {product.rating.rate} ({product.rating.count})
          </p>

          <p className="text-purple-600 text-xl font-bold mb-4">
            ${product.price}
          </p>

          <p className="text-gray-600 mb-6">
            {product.description}
          </p>

          <button
            onClick={() =>
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
              })
            }
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
