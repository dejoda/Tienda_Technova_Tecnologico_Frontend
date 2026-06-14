
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from "react";

import axios from "axios";

import type {
  ApiResponse
} from "../service/common/index.model";

// =========================
// URL BACKEND
// =========================
const URL = "http://localhost:8080";

// =========================
// TIPOS
// =========================
export interface Rol {

  id: number;

  nombre:
    | "admin"
    | "vendedor"
    | "cliente";
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

// =========================
// RESPUESTA LOGIN
// =========================
interface LoginResponse {

  token: string;

  user: AuthUser;
}

// =========================
// CONTEXT
// =========================
interface AuthContextType {

  user: AuthUser | null;

  token: string | null;

  isAuthenticated: boolean;

  isLoading: boolean;

  login: (
    username: string,
    password: string
  ) => Promise<void>;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

// =========================
// PROVIDER
// =========================
export const AuthProvider = ({
  children
}: {
  children: ReactNode;
}) => {

  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  // =========================
  // RECUPERAR SESIÓN
  // =========================
  useEffect(() => {

    const storedUser =
      localStorage.getItem("auth_user");

    const storedToken =
      localStorage.getItem("auth_token");

    if (storedUser && storedToken) {

      setUser(JSON.parse(storedUser));

      setToken(storedToken);
    }

    setIsLoading(false);

  }, []);

  // =========================
  // LOGIN
  // =========================
  const login = async (
    username: string,
    password: string
  ) => {

    setIsLoading(true);

    try {

      const response = await axios.post<
        ApiResponse<LoginResponse>
      >(`${URL}/auth/login`, {

        username,
        password

      });

      const data = response.data.data;

      setUser(data.user);

      setToken(data.token);

      // LOCAL STORAGE
      localStorage.setItem(
        "auth_user",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "auth_token",
        data.token
      );

      // TOKEN GLOBAL AXIOS
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;

    } catch (error: any) {

      console.error(error);

      throw new Error(
        error?.response?.data?.message ||
        "Error al iniciar sesión"
      );

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

    delete axios.defaults.headers.common[
      "Authorization"
    ];
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
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

  if (!ctx) {

    throw new Error(
      "useAuth debe usarse dentro de <AuthProvider>"
    );
  }

  return ctx;
};

