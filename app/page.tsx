"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useCart } from '@/context/CartContext' // Adjust kalau path context beda

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

interface Toast {
  id: number
  message: string
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([]) // State untuk toast
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProducts = await fetch("https://fakestoreapi.com/products")
        const dataProducts = await resProducts.json()
        setProducts(dataProducts)

        const resCategories = await fetch("https://fakestoreapi.com/products/categories")
        const dataCategories = await resCategories.json()
        setCategories(dataCategories)
      } catch (error) {
        console.error("Fetch error:", error)
      }
    }

    fetchData()
  }, [])

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products

  const showToast = (message: string) => {
    const id = Date.now() // Unique ID
    setToasts(prev => [...prev, { id, message }])

    // Auto hilang setelah 2.5 detik
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 2500)
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    showToast(`"${product.title.slice(0, 30)}${product.title.length > 30 ? '...' : ''}" added to cart! 🛒`)
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50 relative"> {/* relative biar toast position absolute work */}
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-purple-700 mb-3">
          K Store
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-medium">
          Find your favorite items at the best prices.
        </p>
      </header>

      {/* Kategori */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-5 py-2 rounded-full font-medium transition ${
            !selectedCategory ? 'bg-purple-700 text-white shadow-lg' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full font-medium capitalize transition ${
              selectedCategory === cat ? 'bg-purple-700 text-white shadow-lg' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List Produk */}
      <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
        {selectedCategory ? `Kategori: ${selectedCategory}` : 'All Product'}
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">There are no products in this category.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <Link href={`/product/${product.id}`} className="block">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-48 mx-auto object-contain mb-4"
                />
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-purple-700">
                  {product.title}
                </h3>
                <p className="text-yellow-500 text-sm mb-2">
                  ⭐ {product.rating.rate} ({product.rating.count})
                </p>
                <p className="text-purple-600 font-bold text-xl">
                  ${product.price}
                </p>
              </Link>

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Custom Toast Container - muncul di pojok kanan bawah */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-out flex items-center gap-3 max-w-xs"
          >
            <span>{toast.message}</span>
            <button
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="ml-auto text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}