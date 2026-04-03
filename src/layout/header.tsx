import { Link } from "react-router";
import "./style/header.css";
import { IconUserFilled } from '@tabler/icons-react';
import { IconShoppingCartFilled } from '@tabler/icons-react';
const Header = () => {
  return (
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

          <nav className="nav" aria-label="Navegacion principal">
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
          
          <button className="icon-btn" aria-label="Carrito">
            <IconShoppingCartFilled />
          </button>
          <Link to="/login" className="user-btn" aria-label="Perfil">
            <IconUserFilled />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
