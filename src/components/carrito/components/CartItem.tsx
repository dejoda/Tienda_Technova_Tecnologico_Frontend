import { IconTrashFilled } from "@tabler/icons-react";
import { useCart } from "../../../context/CartContext";
import type { CartItem as CartItemType } from "../../../context/CartContext";
import "./style/CartItem.css"

interface Props {
  item: CartItemType;
}

const CartItem = ({ item }: Props) => {
  const { increase, decrease, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-img">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="cart-info">
        <h4 className="cart-name">{item.name}</h4>

        <div className="cart-middle">
          <span className="cart-price">S/ {item.price}</span>
          <span className="cart-subtotal">
            S/ {(item.price * item.quantity).toFixed(2)}
          </span>
        </div>

        <div className="cart-actions">
          <div className="cart-qty">
            <button onClick={() => decrease(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increase(item.id)}>+</button>
          </div>

          <button
            className="cart-remove"
            onClick={() => removeFromCart(item.id)}
          >
            <IconTrashFilled size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;