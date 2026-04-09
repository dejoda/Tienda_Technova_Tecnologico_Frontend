import { IconShoppingCartFilled, IconX } from "@tabler/icons-react";
import { useCart } from "../../context/CartContext";
import CartItem from "./components/CartItem";

import "./carrito.css";

const Carrito = ({ isOpen = false, onClose = () => {} }) => { //Const carrito recibe los parametros 
                                                              // isOpen(controla si el carrito se muestra o no ) y onClose(permite cerrarlo) 
const { cart, total } = useCart(); // Se obtienen cart y total desde useCart,
// que es una función (hook personalizada) que proporciona los datos del carrito

  return (
    <>
      <div className={`overlay ${isOpen ? "show" : ""}`} onClick={onClose} />  

      <aside className={`carrito-drawer ${isOpen ? "open" : ""}`}>
        <div className="carrito-header">
          <h3>Tu carrito</h3>
          <button className="close-btn" onClick={onClose}>
            <IconX stroke={2} />
          </button>
        </div>

        <div className="carrito-body">
          {cart.length === 0 ? (
            <p className="empty">
              <IconShoppingCartFilled size={50} />
              <span>Tu carrito está vacío</span>
            </p>
          ) : (
            cart.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {cart.length > 0 && (
          <div className="carrito-footer">
            <div className="total">
              <span>Total:</span>
              <strong>S/ {total.toFixed(2)}</strong>
            </div>

            <button className="checkout-btn">Finalizar compra</button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Carrito;
