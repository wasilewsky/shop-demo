import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { useCart } from "./cart/CartContext";

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

function Products() {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'default' | 'title' | 'price-low' | 'price-high'>('default');

    const { cart, add, remove } = useCart();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            setError(null);
            setProducts(data);
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

    const sortedProducts = 
        sortBy === 'default' ? products : [...products].sort(
            sortBy === 'title' ? (a, b) => a.title.localeCompare(b.title) 
            : sortBy === 'price-low' ? (a, b) => a.price - b.price 
            : (a, b) => b.price - a.price);

    return (
        <div className="flex flex-col items-center gap-6 text-center w-full">
            <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold text-slate-900">Products</h1>
            <p className="text-slate-600">Browse our collection</p>
            </div>
            
            <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-sm font-medium text-slate-700">
                Sort by:
            </label>
            <select 
                id="sort"
                value={sortBy} 
                onChange={e => setSortBy(e.target.value as 'default' | 'title' | 'price-low' | 'price-high')}
                className="px-4 py-2 border border-sky-200 rounded-lg bg-white text-slate-900 cursor-pointer"
            >
                <option value="default">Default</option>
                <option value="title">Title (A-Z)</option>
                <option value="price-low">Price (Low-High)</option>
                <option value="price-high">Price (High-Low)</option>
            </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {sortedProducts.map(product => (
                <ProductCard 
                key={product.id}
                product={product} 
                quantity={cart[product.id] ?? 0} 
                onAdd={() => add(product.id)} 
                onRemove={() => remove(product.id)} 
                />
            ))}
            </div>
        </div>
    );
}

export default Products;
