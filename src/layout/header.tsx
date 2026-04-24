import { Link, NavLink, useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import "./style/header.css";
import { IconUserFilled, IconShoppingCartFilled } from "@tabler/icons-react";
import Carrito from "../components/carrito/carrito";
import Buscador from "../components/buscador/buscador.tsx";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/authcontext";
import logoImage from "../assets/logotipo.png";

const Header = () => {
  const { count } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [openCart, setOpenCart] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setOpenUserMenu(false);
    navigate("/login");
  };

  // Nombre completo desde perfil, o username si es admin
  const getDisplayName = () => {
    if (!user) return "";
    if (user.perfil) return `${user.perfil.nombre} ${user.perfil.apellido}`;
    return user.username;
  };

  const getRolColor = () => {
    if (!user) return "#7b61ff";
    const colors = { admin: "#ff0000", vendedor: "#aa34b9", cliente: "#12b112" };
    return colors[user.rol.nombre];
  };

  const getRolLabel = () => {
    if (!user) return "";
    const labels = { admin: "Administrador", vendedor: "Vendedor", cliente: "Cliente" };
    return labels[user.rol.nombre];
  };

  const getDashboardPath = () => {
    if (!user) return "/dashboard";
    return `/dashboard/${user.rol.nombre}`;
  };

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <div className="header-left">
            <Link to="/" className="brand">
              <div className="logo-mark" aria-hidden>
                <img src={logoImage} alt="Technova" className="logo-image" />
              </div>
              <div className="logo-text">TECHNOVA</div>
            </Link>

            <nav className="nav">
              <ul>
                <li>
                  <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
                    Inicio
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/productos" className={({ isActive }) => isActive ? "active" : ""}>
                    Productos
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/nosotros" className={({ isActive }) => isActive ? "active" : ""}>
                    Nosotros
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="header-actions">
            <Buscador />

            <button className="icon-btn cart-btn" onClick={() => setOpenCart(true)}>
              <IconShoppingCartFilled />
              {count > 0 && (
                <span className="cart-badge">{count > 99 ? "+99" : count}</span>
              )}
            </button>

            {/* No logueado → icono simple */}
            {!isAuthenticated ? (
              <Link to="/login" className="user-btn">
                <IconUserFilled />
              </Link>
            ) : (
              /* Logueado → mismo icono con dot de color + dropdown */
              <div className="user-menu-wrapper" ref={menuRef}>
                <button
                  className="user-btn user-btn--active"
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                  style={{ borderColor: getRolColor() }}
                  aria-label="Menú de usuario"
                >
                  <IconUserFilled />
                  <span className="user-avatar-dot" style={{ backgroundColor: getRolColor() }} />
                </button>

                {openUserMenu && (
                  <div className="user-dropdown">
                    <div className="user-dropdown__header">
                      <div className="user-dropdown__avatar-icon">
                        <IconUserFilled size={18} />
                      </div>
                      <div className="user-dropdown__info">
                        <p className="user-dropdown__name">{getDisplayName()}</p>
                        <span
                          className="user-dropdown__role"
                          style={{
                            color: getRolColor(),
                            borderColor: `${getRolColor()}40`,
                            backgroundColor: `${getRolColor()}15`,
                          }}
                        >
                          {getRolLabel()}
                        </span>
                      </div>
                    </div>

                    <div className="user-dropdown__divider" />

                    <Link to={getDashboardPath()} className="user-dropdown__item" onClick={() => setOpenUserMenu(false)}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                      </svg>
                      Ir al Dashboard
                    </Link>

                    <Link to={`${getDashboardPath()}/perfil`} className="user-dropdown__item" onClick={() => setOpenUserMenu(false)}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                      Mi Perfil
                    </Link>

                    <div className="user-dropdown__divider" />

                    <button className="user-dropdown__item user-dropdown__item--danger" onClick={handleLogout}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <Carrito isOpen={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
};

export default Header;