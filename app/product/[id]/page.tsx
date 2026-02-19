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

import ProductDetailClient from './ProductDetailClient';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) return [];
    
    const products: Product[] = await res.json();
    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error("Build error:", error);
    return [];
  }
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export default async function ProductDetail({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p>Sorry, product {id} not found.</p>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}