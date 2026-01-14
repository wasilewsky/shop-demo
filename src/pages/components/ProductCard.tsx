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
        <div className="flex flex-col items-center gap-4 border border-sky-100 rounded-lg bg-white p-6 shadow-sm w-full h-full min-h-[400px]">
            <img className="w-full max-w-[200px] h-48 object-contain" src={product.image} alt={product.title} />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-xl font-bold">💰 {product.price}</p>
            <p className="text-sm text-slate-600">{product.category}</p>
            <p className="text-sm">⭐ {product.rating.rate} ({product.rating.count})</p>
            <div className="flex items-center gap-2 mt-2">
                <button className="px-4 py-2 rounded-md bg-sky-100 hover:bg-sky-200 disabled:opacity-50 disabled:cursor-not-allowed" onClick={onRemove} disabled={quantity === 0}>-</button>
                <span className="px-3 font-semibold">{quantity}</span>
                <button className="px-4 py-2 rounded-md bg-sky-100 hover:bg-sky-200" onClick={onAdd}>+</button>
            </div>
        </div>
    );
}

export default ProductCard;