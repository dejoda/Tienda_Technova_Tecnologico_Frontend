import { Link } from "react-router";
import { useState } from "react";
import "./style/header.css";
import { IconUserFilled, IconShoppingCartFilled } from "@tabler/icons-react";
import Carrito from "../components/carrito/carrito"; // 👈 importa tu carrito
import { useCart } from "../context/CartContext";

const Header = () => {
  const { count } = useCart();
  const [openCart, setOpenCart] = useState(false); // 🔥 estado

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <div className="header-left">
            <Link to="/" className="brand">
              <div className="logo-mark" aria-hidden>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 12c0-4.97 4.03-9 9-9"
                    stroke="#ff2d95"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M21 12c0 4.97-4.03 9-9 9"
                    stroke="#7b61ff"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="12" r="3" fill="#fff" opacity="0.08" />
                </svg>
              </div>
              <div className="logo-text">TECHNOVA</div>
            </Link>

            <nav className="nav">
              <ul>
                <li>
                  <Link to="/">Inicio</Link>
                </li>
                <li>
                  <Link to="/productos">Productos</Link>
                </li>
                <li>
                  <Link to="/nosotros">Nosotros</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="header-actions">
            {/* 🔥 BOTÓN FUNCIONAL */}
            <button
              className="icon-btn cart-btn"
              onClick={() => setOpenCart(true)}
            >
              <IconShoppingCartFilled />

              {count > 0 && (
                <span className="cart-badge">{count > 99 ? "+99" : count}</span>
              )}
            </button>

            <Link to="/login" className="user-btn">
              <IconUserFilled />
            </Link>
          </div>
        </div>
      </header>

      {/* 🔥 AQUI SE RENDERIZA EL CARRITO */}
      <Carrito isOpen={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
};

export default Header;
