import ProductDetailClient from './ProductDetailClient';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export const revalidate = 60; // ISR: revalidate setiap 60 detik

export async function generateStaticParams() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products: Product[] = await res.json();  // <-- tambah tipe array

  return products.map((product: Product) => ({  // <-- tambah : Product di parameter
    id: product.id.toString(),
  }));
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: 'no-store' // force SSR / fresh data setiap request
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="p-10 text-center min-h-screen flex items-center justify-center">
        <div>
          <h1 className="text-3xl font-bold text-red-600 mb-4">Product Not Found</h1>
          <p className="text-gray-600">Produk yang Anda cari tidak tersedia atau ID salah.</p>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}