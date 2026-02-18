import ProductDetailClient from "./ProductDetailClient"

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

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/${id}`,
      { cache: "no-store" }
    )

    if (!res.ok) return null

    return await res.json()
  } catch (error) {
    console.error("Fetch error:", error)
    return null
  }
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!id) {
    return <div className="p-10">Invalid product ID</div>
  }

  const product = await getProduct(id)

  if (!product) {
    return <div className="p-10">Product not found</div>
  }

  return <ProductDetailClient product={product} />
}
