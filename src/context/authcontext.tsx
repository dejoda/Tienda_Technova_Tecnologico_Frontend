import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from "react";
import axios from "axios";
import type { ApiResponse } from "../service/common/index.model";
import { environment } from "../environments/environment.development";

const URL = environment.apiBaseUrl;

// =========================
// TIPOS
// =========================
export interface Rol {
  id: number;
  nombre: "admin" | "vendedor" | "cliente";
}

export interface Perfil {
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
  perfil: Perfil;
}

interface LoginResponse {
  token: string;
  user: AuthUser;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =========================
// PROVIDER
// =========================
export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Recuperar sesión al montar
  useEffect(() => {
    const storedUser  = localStorage.getItem("auth_user");
    const storedToken = localStorage.getItem("auth_token");

    if (storedUser && storedToken) {
      const parsedUser: AuthUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    setIsLoading(false);
  }, []);

  // =========================
  // LOGIN
  // =========================
  const login = async (username: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${URL}/auth/login`,
        { username, password }
      );

      // Backend devuelve directo: { token, username, rol }
      const { token: newToken, username: uname, rol } = response.data;

      const normalizedUser: AuthUser = {
        id: 0,                          // el backend no devuelve id aún
        username: uname,
        rol: {
          id: 0,
          nombre: rol.toLowerCase() as "admin" | "vendedor" | "cliente",
        },
        perfil: {
          id: 0,
          nombre: uname,
          apellido: "",
          correo: "",
          telefono: "",
        },
      };

      setUser(normalizedUser);
      setToken(newToken);

      localStorage.setItem("auth_user", JSON.stringify(normalizedUser));
      localStorage.setItem("auth_token", newToken);

      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

    } catch (error: any) {           // ← aquí empieza
      const status = error?.response?.status;

      let msg = "Error al iniciar sesión";

      if (status === 403 || status === 401) {
        msg = "Usuario o contraseña incorrectos";
      } else if (status === 500) {
        msg = "Error del servidor, intenta más tarde";
      } else if (!error?.response) {
        msg = "No se pudo conectar al servidor";
      }

      throw new Error(msg);          // ← aquí termina
    } finally {
      setIsLoading(false);
    }
};

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =========================
// HOOK
// =========================
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
};