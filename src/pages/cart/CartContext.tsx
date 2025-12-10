import { createContext, useContext, useEffect, useMemo, useState } from "react";


type Cart = Record<number, number>;

interface CartContext {
    cart: Cart;
    add: (id: number) => void;
    remove: (id: number) => void;
    clear: () => void;
    total: number;
}

const CartContext = createContext<CartContext | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<Cart>(() => {
        const raw = localStorage.getItem('cart')
        if (raw) {
            try {
                return JSON.parse(raw)
            } catch {
                return {}
            }
        }
        return {}
    });
    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const add = (id: number) => setCart(c => ({ ...c, [id]: (c[id] ?? 0) + 1 }))
    const remove = (id: number) => setCart(c => {
    const next = (c[id] ?? 0) - 1
    if (next <= 0) {
        const { [id]: _, ...rest } = c
        return rest
    }
    return { ...c, [id]: next }
    })
    const clear = () => setCart({})

    const total = useMemo(() => Object.values(cart).reduce((s, n) => s + n, 0), [cart])

    const value = useMemo(() => ({ cart, add, remove, clear, total }), [cart, total])
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used within CartProvider')
    return ctx
}
