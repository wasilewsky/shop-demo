import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { useCart } from "./cart/CartContext";
import { Link } from "react-router-dom";

interface ProductProps {
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

function Home() {
    const [product, setProduct] = useState<ProductProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const { cart, add, remove, total } = useCart();
  
    useEffect(() => {
      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
          setError(null);
          setProduct(data[Math.floor(Math.random() * data.length)]);
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, []);
  
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
          <p className="text-slate-600">Loading products...</p>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <div className="text-red-500 text-xl">⚠️</div>
          <p className="text-lg text-slate-900">Failed to fetch products</p>
          <p className="text-slate-600">{error}</p>
        </div>
      );
    }
  
    return (
      <div className="flex flex-col items-center gap-8 text-center w-full">
        <div className="flex flex-col items-center gap-4 max-w-2xl">
          <h1 className="text-4xl font-bold text-slate-900">Welcome to Shop Demo</h1>
          <p className="text-lg text-slate-600">
            Discover amazing products from our collection. Browse and add items to your cart!
          </p>
          {total > 0 && (
            <p className="text-sm text-slate-500">
              You have {total} {total === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
        </div>
  
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="flex flex-col items-center gap-2">
            <span className="px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-sm font-semibold">
              🎲 Random Deal
            </span>
            <h2 className="text-2xl font-semibold text-slate-900">Featured Product</h2>
          </div>
          
          {product && (
            <div className="w-full max-w-md">
              <ProductCard 
                product={product} 
                quantity={cart[product.id] ?? 0} 
                onAdd={() => add(product.id)} 
                onRemove={() => remove(product.id)} 
              />
            </div>
          )}
        </div>
  
        <Link 
          to="/products"
          className="px-6 py-3 bg-sky-900 text-white rounded-lg font-medium hover:bg-sky-800 transition-colors"
        >
          Browse All Products →
        </Link>
      </div>
    );
}

export default Home;
