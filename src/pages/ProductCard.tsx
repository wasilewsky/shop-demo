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

interface ProductCardProps {
    product: ProductProps;
    quantity: number;
    onAdd: () => void;
    onRemove: () => void;
}

function ProductCard({ product, quantity, onAdd, onRemove }: ProductCardProps) {
    return (
        <div>
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>$ {product.price}</p>
            <p>{product.category}</p>
            <p>{product.rating.rate} ({product.rating.count})</p>
            <button onClick={onRemove} disabled={quantity === 0}>-</button>
            <span>{quantity}</span>
            <button onClick={onAdd}>+</button>
        </div>
    );
}

export default ProductCard;