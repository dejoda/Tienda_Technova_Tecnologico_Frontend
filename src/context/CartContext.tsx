import {createContext,useContext,useState,useEffect,type ReactNode,} from "react";

/* =========================================================
   🧾 TIPOS
========================================================= */
export interface CartItem { //Sirve para el producto añadido en el carro (su estructura)
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType { //Diferentes funciones como añadir al carrito el producto
                            //Eliminar incrementar productos como reducir , tambien se declaran las variables total y count 
  cart: CartItem[];//de tipo array de CartItems (productos)

  addToCart: (product: Omit<CartItem, "quantity">, qty?: number) => void;
  removeFromCart: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;

  total: number; //variable total para suma totoal de precios
  count: number; // conteo de productos
}

/* =========================================================
   🌐 CONTEXT
========================================================= */
const CartContext = createContext<CartContextType | undefined>(undefined);  

/* =========================================================
   🪝 HOOK
========================================================= */
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
};

/* =========================================================
   🛒 PROVIDER
========================================================= */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Error leyendo carrito:", error);
    return [];
  }
});

  /* ======================================================
     📦 LOCAL STORAGE
  ====================================================== */


  // 🔹 Guardar carrito cuando cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ======================================================
     ⚙️ FUNCIONES DEL CARRITO
  ====================================================== */

  // 🛒 Agregar producto
  const addToCart = (
    product: Omit<CartItem, "quantity">,
    qty: number = 1
  ) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === product.id);

      if (exist) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + qty }
            : p
        );
      }

      return [...prev, { ...product, quantity: qty }];
    });
  };

  // ❌ Eliminar producto
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // ➕ Aumentar cantidad
  const increase = (id: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  // ➖ Disminuir cantidad
  const decrease = (id: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantity: p.quantity > 1 ? p.quantity - 1 : 1 }
          : p
      )
    );
  };

  /* ======================================================
     📊 DERIVADOS
  ====================================================== */

  // 💰 Total del carrito
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 🔢 Cantidad total de productos
  const count = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  /* ======================================================
     🚀 PROVIDER VALUE
  ====================================================== */
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