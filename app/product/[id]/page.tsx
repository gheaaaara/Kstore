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

export const dynamic = 'force-dynamic';

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: 'no-store',
      // Tambah timeout biar gak hang lama kalau API lambat
      signal: AbortSignal.timeout(10000), // 10 detik timeout
    });

    if (!res.ok) {
      console.warn(`Product ${id} not ok: ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Critical error fetching product ${id}:`, error);
    return null; // selalu return null kalau error apa pun
  }
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  let product: Product | null = null;
  let errorMessage = '';

  try {
    const { id } = await params;
    product = await getProduct(id);
  } catch (error) {
    console.error('Error in ProductDetail:', error);
    errorMessage = 'A server error occured. Please try again later.';
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
        <div className="text-center max-w-lg">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Product Not Found</h1>
          <p className="text-lg text-gray-700 mb-6">
            {errorMessage || `Sorry, product with this ID is not available at this time.`}
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}