import { createContext, useContext, useState, type ReactNode } from "react";

/* ===== TIPOS ===== */
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">, qty?: number) => void;
  removeFromCart: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  total: number;
  count: number;
}

/* ===== CONTEXT ===== */
const CartContext = createContext<CartContextType | undefined>(undefined);

/* ===== HOOK ===== */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
};

/* ===== PROVIDER ===== */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 🛒 AGREGAR
  const addToCart = (product: Omit<CartItem, "quantity">, qty: number = 1) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === product.id);

      if (exist) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + qty } : p,
        );
      }

      return [...prev, { ...product, quantity: qty }];
    });
  };

  // ❌ ELIMINAR
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // ➕
  const increase = (id: number) => {
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)),
    );
  };

  // ➖
  const decrease = (id: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantity: p.quantity > 1 ? p.quantity - 1 : 1 }
          : p,
      ),
    );
  };

  // 💰 TOTAL
  const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

  // 🔢 CANTIDAD TOTAL
  const count = cart.reduce((acc, p) => acc + p.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increase,
        decrease,
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
