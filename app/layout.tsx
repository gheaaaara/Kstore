import "./globals.css"
import Link from "next/link"
import { ReactNode } from "react"
import { CartProvider } from "../context/CartContext"

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <CartProvider>
          <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-purple-600">
              🛍 K Store
            </Link>

            <div className="flex gap-6">
              <Link href="/" className="hover:text-purple-600">
                Home
              </Link>
              <Link href="/cart" className="hover:text-purple-600">
                Cart
              </Link>
            </div>
          </nav>

          {children}
        </CartProvider>
      </body>
    </html>
  )
}
