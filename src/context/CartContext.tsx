
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";

export interface CartItem {

  id: number;

  name: string;

  price: number;

  image: string;

  quantity: number;
}

interface CartContextType {

  cart: CartItem[];

  addToCart: (
    product: Omit<CartItem, "quantity">,
    qty?: number
  ) => void;

  removeFromCart: (
    id: number
  ) => void;

  increase: (
    id: number
  ) => void;

  decrease: (
    id: number
  ) => void;

  clearCart: () => void;

  total: number;

  count: number;
}

/* =========================================================
   🌐 CONTEXT
========================================================= */
const CartContext =
  createContext<CartContextType | undefined>(
    undefined
  );

/* =========================================================
   🪝 HOOK
========================================================= */
export const useCart = () => {

  const context = useContext(CartContext);

  if (!context) {

    throw new Error(
      "useCart debe usarse dentro de CartProvider"
    );
  }

  return context;
};

/* =========================================================
   🛒 PROVIDER
========================================================= */
export const CartProvider = ({
  children
}: {
  children: ReactNode;
}) => {

  // =========================
  // ESTADO
  // =========================
  const [cart, setCart] =
    useState<CartItem[]>(() => {

      try {

        const savedCart =
          localStorage.getItem("cart");

        return savedCart
          ? JSON.parse(savedCart)
          : [];

      } catch (error) {

        console.error(
          "Error leyendo carrito:",
          error
        );

        return [];
      }
    });

  /* ======================================================
     💾 LOCAL STORAGE
  ====================================================== */
  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

  }, [cart]);

  /* ======================================================
     🛒 AGREGAR PRODUCTO
  ====================================================== */
  const addToCart = (
    product: Omit<CartItem, "quantity">,
    qty: number = 1
  ) => {

    setCart((prev) => {

      const exist =
        prev.find(
          (p) => p.id === product.id
        );

      // YA EXISTE
      if (exist) {

        return prev.map((p) =>

          p.id === product.id

            ? {
                ...p,
                quantity:
                  p.quantity + qty
              }

            : p
        );
      }

      // NUEVO PRODUCTO
      return [

        ...prev,

        {
          ...product,
          quantity: qty
        }
      ];
    });
  };

  /* ======================================================
     ❌ ELIMINAR PRODUCTO
  ====================================================== */
  const removeFromCart = (
    id: number
  ) => {

    setCart((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  /* ======================================================
     ➕ AUMENTAR
  ====================================================== */
  const increase = (
    id: number
  ) => {

    setCart((prev) =>

      prev.map((p) =>

        p.id === id

          ? {
              ...p,
              quantity:
                p.quantity + 1
            }

          : p
      )
    );
  };

  /* ======================================================
     ➖ DISMINUIR
  ====================================================== */
  const decrease = (
    id: number
  ) => {

    setCart((prev) =>

      prev.map((p) =>

        p.id === id

          ? {
              ...p,
              quantity:
                p.quantity > 1
                  ? p.quantity - 1
                  : 1
            }

          : p
      )
    );
  };

  /* ======================================================
     🧹 LIMPIAR CARRITO
  ====================================================== */
  const clearCart = () => {

    setCart([]);
  };

  /* ======================================================
     💰 TOTAL
  ====================================================== */
  const total = useMemo(() => {

    return cart.reduce(

      (acc, item) =>

        acc +
        item.price * item.quantity,

      0
    );

  }, [cart]);

  /* ======================================================
     🔢 CANTIDAD TOTAL
  ====================================================== */
  const count = useMemo(() => {

    return cart.reduce(

      (acc, item) =>

        acc + item.quantity,

      0
    );

  }, [cart]);

  /* ======================================================
     🚀 PROVIDER
  ====================================================== */
  return (

    <CartContext.Provider
      value={{

        cart,

        addToCart,

        removeFromCart,

        increase,

        decrease,

        clearCart,

        total,

        count,
      }}
    >

      {children}

    </CartContext.Provider>
  );
};

