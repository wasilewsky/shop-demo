import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Cart = Record<number, number>

interface CartContextValue {
  cart: Cart
  add: (productId: number) => void
  remove: (productId: number) => void
  clear: () => void
  total: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

function loadCartFromStorage(): Cart {
  const raw = localStorage.getItem('cart')
  if (!raw) return {}

  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(() => loadCartFromStorage())

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const add = (productId: number) => {
    setCart((prevCart) => {
      const currentQuantity = prevCart[productId] ?? 0
      const nextQuantity = currentQuantity + 1

      return {
        ...prevCart,
        [productId]: nextQuantity,
      }
    })
  }

  const remove = (productId: number) => {
    setCart((prevCart) => {
      const currentQuantity = prevCart[productId] ?? 0
      const nextQuantity = currentQuantity - 1

      if (nextQuantity <= 0) {
        const copy = { ...prevCart }
        delete copy[productId]
        return copy
      }

      return {
        ...prevCart,
        [productId]: nextQuantity,
      }
    })
  }

  const clear = () => {
    setCart({})
  }

  const total = useMemo(() => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  }, [cart])

  const value = useMemo(
    () => ({
      cart,
      add,
      remove,
      clear,
      total,
    }),
    [cart, total],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}