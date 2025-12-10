import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

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
        <div>
        <h1>Welcome to the Products Page</h1>
        <p>This is the product listing page.</p>
        <select value={sortBy} onChange={e => setSortBy(e.target.value as 'default' | 'title' | 'price-low' | 'price-high')}>
            <option value="default">Default</option>
            <option value="title">Title (A-Z)</option>
            <option value="price-low">Price (Low-High)</option>
            <option value="price-high">Price (High-Low)</option>
        </select>
        <ul>
            {sortedProducts.map(product => (
                <li key={product.id}>
                    <ProductCard product={product} />
                </li>
            ))}
        </ul>
        </div>
    );
}

export default Products;
