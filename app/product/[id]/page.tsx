import ProductDetailClient from './ProductDetailClient';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number; };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  return products.map((product) => ({
    id: product.id.toString(),  
  }));
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return <div className="p-10 text-center"><h1>Product not found</h1></div>;
  }

  return <ProductDetailClient product={product} />;
}