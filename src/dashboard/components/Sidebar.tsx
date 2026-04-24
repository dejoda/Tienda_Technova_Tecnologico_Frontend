import { NavLink } from "react-router";
import { IconLogout } from "@tabler/icons-react";
import { useAuth } from "../../context/authcontext";
import { menuByRole, getRoleColor, getRoleLabel } from "./SidebarByRole";
import logoImage from "../../assets/logotipo.png";
import "./style/Sidebar.css";

const Sidebar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const rol = user.rol.nombre;
  const menu = menuByRole[rol];
  const menuItems = menu.flatMap((section) => section.items);
  const roleColor = getRoleColor(rol);
  const roleLabel = getRoleLabel(rol);
  const initials = `${user.perfil.nombre[0]}${user.perfil.apellido[0]}`.toUpperCase();
  const fullName = `${user.perfil.nombre} ${user.perfil.apellido}`;

  return (
    <aside className="sidebar">

      {/* ── Header ── */}
      <div className="sidebar__header">
        <div className="sidebar__brand">
          <img src={logoImage} alt="Technova" className="sidebar__brand-image" />
          <span className="sidebar__brand-name">TECHNOVA</span>
        </div>
      </div>

      {/* ── Usuario ── */}
      <div className="sidebar__user">
        <div className="sidebar__avatar" style={{ borderColor: roleColor }}>
          <span>{initials}</span>
          <span className="sidebar__role-dot" style={{ backgroundColor: roleColor }} />
        </div>
        <div className="sidebar__user-info">
          <p className="sidebar__user-name">{fullName}</p>
          <span
            className="sidebar__role-badge"
            style={{
              color: roleColor,
              borderColor: `${roleColor}40`,
              backgroundColor: `${roleColor}15`,
            }}
          >
            {roleLabel}
          </span>
        </div>
      </div>

      <div className="sidebar__divider" />

      {/* ── Navegación ── */}
      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={
                    item.path === "/dashboard/admin" ||
                    item.path === "/dashboard/vendedor" ||
                    item.path === "/dashboard/cliente"
                  }
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
                  }
                  style={({ isActive }) =>
                    isActive ? { color: roleColor } : {}
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className="sidebar__link-indicator"
                        style={isActive ? { backgroundColor: roleColor, height: "24px" } : {}}
                      />
                      <Icon size={20} className="sidebar__link-icon" />
                      <span className="sidebar__link-label">{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Footer / Logout ── */}
      <div className="sidebar__footer">
        <div className="sidebar__divider" />
        <button
          className="sidebar__logout"
          onClick={logout}
        >
          <IconLogout size={20} stroke={2} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;