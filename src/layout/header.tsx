
import {
  Link,
  NavLink,
  useNavigate
} from "react-router";

import {
  useState,
  useRef,
  useEffect
} from "react";

import "./style/header.css";

import {
  IconUserFilled,
  IconShoppingCartFilled
} from "@tabler/icons-react";

import Carrito
  from "../components/carrito/carrito";

import Buscador
  from "../components/buscador/buscador";

import { useCart }
  from "../context/CartContext";

import { useAuth }
  from "../context/authcontext";

import logoImage
  from "../assets/logotipo.png";

const Header = () => {

  // =========================
  // CONTEXT
  // =========================
  const { count } = useCart();

  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();

  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================
  const [openCart, setOpenCart] =
    useState(false);

  const [openUserMenu, setOpenUserMenu] =
    useState(false);

  // =========================
  // REFS
  // =========================
  const menuRef =
    useRef<HTMLDivElement>(null);

  // =========================
  // CERRAR MENU EXTERNO
  // =========================
  useEffect(() => {

    const handleClickOutside = (
      e: MouseEvent
    ) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(
          e.target as Node
        )
      ) {

        setOpenUserMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {

    logout();

    setOpenUserMenu(false);

    navigate("/login");
  };

  // =========================
  // DISPLAY NAME
  // =========================
  const getDisplayName = () => {

    if (!user) return "";

    if (user.perfil) {

      return `
        ${user.perfil.nombre}
        ${user.perfil.apellido}
      `;
    }

    return user.username;
  };

  // =========================
  // COLOR ROL
  // =========================
  const getRolColor = () => {

    if (!user) return "#7b61ff";

    const colors = {

      admin: "#ff3b30",

      vendedor: "#aa34b9",

      cliente: "#12b112",
    };

    return colors[user.rol.nombre];
  };

  // =========================
  // LABEL ROL
  // =========================
  const getRolLabel = () => {

    if (!user) return "";

    const labels = {

      admin: "Administrador",

      vendedor: "Vendedor",

      cliente: "Cliente",
    };

    return labels[user.rol.nombre];
  };

  // =========================
  // DASHBOARD
  // =========================
  const getDashboardPath = () => {

    if (!user) {

      return "/dashboard";
    }

    return `/dashboard/${user.rol.nombre}`;
  };

  return (
    <>

      <header className="site-header">

        <div className="header-inner">

          {/* =========================
              IZQUIERDA
             ========================= */}
          <div className="header-left">

            {/* LOGO */}
            <Link
              to="/"
              className="brand"
            >

              <div
                className="logo-mark"
                aria-hidden
              >

                <img
                  src={logoImage}
                  alt="Technova"
                  className="logo-image"
                />

              </div>

              <div className="logo-text">
                TECHNOVA
              </div>

            </Link>

            {/* NAV */}
            <nav className="nav">

              <ul>

                <li>

                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      isActive
                        ? "active"
                        : ""
                    }
                  >
                    Inicio
                  </NavLink>

                </li>

                <li>

                  <NavLink
                    to="/productos"
                    className={({ isActive }) =>
                      isActive
                        ? "active"
                        : ""
                    }
                  >
                    Productos
                  </NavLink>

                </li>

                <li>

                  <NavLink
                    to="/nosotros"
                    className={({ isActive }) =>
                      isActive
                        ? "active"
                        : ""
                    }
                  >
                    Nosotros
                  </NavLink>

                </li>

              </ul>

            </nav>

          </div>

          {/* =========================
              DERECHA
             ========================= */}
          <div className="header-actions">

            {/* BUSCADOR */}
            <Buscador />

            {/* CARRITO */}
            <button
              className="icon-btn cart-btn"
              onClick={() =>
                setOpenCart(true)
              }
            >

              <IconShoppingCartFilled />

              {count > 0 && (

                <span className="cart-badge">

                  {count > 99
                    ? "+99"
                    : count}

                </span>

              )}

            </button>

            {/* =========================
                SIN LOGIN
               ========================= */}
            {!isAuthenticated ? (

              <Link
                to="/login"
                className="user-btn"
              >

                <IconUserFilled />

              </Link>

            ) : (

              /* =========================
                  USER MENU
                 ========================= */
              <div
                className="user-menu-wrapper"
                ref={menuRef}
              >

                <button
                  className="
                    user-btn
                    user-btn--active
                  "
                  onClick={() =>
                    setOpenUserMenu(
                      !openUserMenu
                    )
                  }
                  style={{
                    borderColor:
                      getRolColor()
                  }}
                  aria-label="Menú de usuario"
                >

                  <IconUserFilled />

                  <span
                    className="user-avatar-dot"
                    style={{
                      backgroundColor:
                        getRolColor()
                    }}
                  />

                </button>

                {/* DROPDOWN */}
                {openUserMenu && (

                  <div className="user-dropdown">

                    {/* HEADER */}
                    <div
                      className="
                        user-dropdown__header
                      "
                    >

                      <div
                        className="
                          user-dropdown__avatar-icon
                        "
                      >

                        <IconUserFilled
                          size={18}
                        />

                      </div>

                      <div
                        className="
                          user-dropdown__info
                        "
                      >

                        <p
                          className="
                            user-dropdown__name
                          "
                        >
                          {getDisplayName()}
                        </p>

                        <span
                          className="
                            user-dropdown__role
                          "
                          style={{
                            color:
                              getRolColor(),

                            borderColor:
                              `${getRolColor()}40`,

                            backgroundColor:
                              `${getRolColor()}15`,
                          }}
                        >

                          {getRolLabel()}

                        </span>

                      </div>

                    </div>

                    <div
                      className="
                        user-dropdown__divider
                      "
                    />

                    {/* DASHBOARD */}
                    <Link
                      to={getDashboardPath()}
                      className="
                        user-dropdown__item
                      "
                      onClick={() =>
                        setOpenUserMenu(false)
                      }
                    >
                      Ir al Dashboard
                    </Link>

                    {/* PERFIL */}
                    <Link
                      to={`
                        ${getDashboardPath()}
                        /perfil
                      `}
                      className="
                        user-dropdown__item
                      "
                      onClick={() =>
                        setOpenUserMenu(false)
                      }
                    >
                      Mi Perfil
                    </Link>

                    <div
                      className="
                        user-dropdown__divider
                      "
                    />

                    {/* LOGOUT */}
                    <button
                      className="
                        user-dropdown__item
                        user-dropdown__item--danger
                      "
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>

                  </div>

                )}

              </div>

            )}

          </div>

        </div>

      </header>

      {/* =========================
          CARRITO SIDEBAR
         ========================= */}
      <Carrito
        isOpen={openCart}
        onClose={() =>
          setOpenCart(false)
        }
      />

    </>
  );
};

export default Header;

