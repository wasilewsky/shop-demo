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
}

function ProductCard({ product }: ProductCardProps) {
    return (
        <div>
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>$ {product.price}</p>
            <p>{product.category}</p>
            <p>{product.rating.rate} ({product.rating.count})</p>
        </div>
    );
}

export default ProductCard;