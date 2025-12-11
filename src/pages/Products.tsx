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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Failed to fetch products</div>;

    const sortedProducts = 
        sortBy === 'default' ? products : [...products].sort(
            sortBy === 'title' ? (a, b) => a.title.localeCompare(b.title) 
            : sortBy === 'price-low' ? (a, b) => a.price - b.price 
            : (a, b) => b.price - a.price);

    return (
        <div className="page-container">
            <h1>Welcome to the Products Page</h1>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as 'default' | 'title' | 'price-low' | 'price-high')}>
                <option value="default">Default</option>
                <option value="title">Title (A-Z)</option>
                <option value="price-low">Price (Low-High)</option>
                <option value="price-high">Price (High-Low)</option>
            </select>
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
    );
}

export default Products;
