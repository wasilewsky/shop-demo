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
    const [sortBy, setSortBy] = useState<'title' | 'price' | 'default'>('default');

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const sortedProducts = products.sort(sortBy === 'title' ? (a, b) => a.title.localeCompare(b.title) : sortBy === 'price' ? (a, b) => a.price - b.price : (a, b) => a.id - b.id);

    return (
        <div>
        <h1>Welcome to the Products Page</h1>
        <p>This is the product listing page.</p>
        <select value={sortBy} onChange={e => setSortBy(e.target.value as 'title' | 'price' | 'default')}>
            <option value="title">Title</option>
            <option value="price">Price</option>
            <option value="default">Default</option>
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
