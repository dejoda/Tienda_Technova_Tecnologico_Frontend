import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// ─── Tipos (reflejan tu BD exactamente) ──────────────────────────────────────

export interface Rol {
  id: number;
  nombre: "admin" | "vendedor" | "cliente";
}

export interface PerfilVendedor {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
}

export interface PerfilCliente {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
}

export interface AuthUser {
  id: number;
  username: string;
  rol: Rol;
  perfil: PerfilVendedor | PerfilCliente | null; // null = admin
}

// ─── Datos en memoria ─────────────────────────────────────────────────────────
// Cuando conectes el backend, borra este array y descomenta el fetch en login()

const MOCK_USERS: { username: string; password: string; user: AuthUser }[] = [
  {
    username: "admin",
    password: "admin123",
    user: {
      id: 1,
      username: "admin",
      rol: { id: 1, nombre: "admin" },
      perfil: null,
    },
  },
  {
    username: "vendedor1",
    password: "vend123",
    user: {
      id: 2,
      username: "vendedor1",
      rol: { id: 2, nombre: "vendedor" },
      perfil: {
        id: 1,
        nombre: "Ana",
        apellido: "García",
        correo: "ana@tienda.com",
        telefono: "999-111-222",
      },
    },
  },
  {
    username: "cliente1",
    password: "cli123",
    user: {
      id: 3,
      username: "cliente1",
      rol: { id: 3, nombre: "cliente" },
      perfil: {
        id: 1,
        nombre: "Luis",
        apellido: "Pérez",
        correo: "luis@gmail.com",
        telefono: "999-333-444",
      },
    },
  },
];

// ─── Contexto ─────────────────────────────────────────────────────────────────

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restaurar sesión al recargar página
  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // ── MOCK (datos en memoria) ─────────────────────────────────────────
      // TODO: cuando tengas backend, reemplaza este bloque con:
      //
      // const res = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ username, password }),
      // });
      // if (!res.ok) throw new Error("Credenciales inválidas");
      // const { user: loggedUser } = await res.json();
      // ───────────────────────────────────────────────────────────────────

      const found = MOCK_USERS.find(
        (u) => u.username === username && u.password === password
      );
      if (!found) throw new Error("Usuario o contraseña incorrectos");
      const loggedUser = found.user;

      // ───────────────────────────────────────────────────────────────────

      setUser(loggedUser);
      localStorage.setItem("auth_user", JSON.stringify(loggedUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
};