import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
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

function Home() {
    const [product, setProduct] = useState<ProductProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { cart, add, remove } = useCart();

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Failed to fetch products</div>;

    return (
    <div>
        <h1>Welcome to the Home Page</h1>
        {product && 
            <ProductCard 
                product={product} 
                quantity={cart[product.id] ?? 0} 
                onAdd={() => add(product.id)} 
                onRemove={() => remove(product.id)} 
            />
        }
    </div>
  );
}

export default Home;
