import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/authcontext";
import "./css/LoginForm.css";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      const storedUser = localStorage.getItem("auth_user");
      const rol = storedUser ? JSON.parse(storedUser).rol?.nombre : null;
      navigate(`/dashboard/${rol ?? "cliente"}`);
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="login-form-card">
      <h2>Iniciar sesión</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="login-username">Usuario</label>
        <input
          id="login-username"
          type="text"
          placeholder="Tu nombre de usuario"
          autoComplete="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="login-password">Contraseña</label>
        <input
          id="login-password"
          type="password"
          placeholder="Ingresa tu contraseña"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Mensaje de error */}
        {error && <p className="login-error">{error}</p>}

        <div className="login-row">
          <label className="login-remember">
            <input type="checkbox" />
            Recordarme
          </label>
          <a href="#" className="login-forgot">
            Olvidé mi contraseña
          </a>
        </div>

        <button type="submit" className="login-submit" disabled={loading}>
          {loading ? "Ingresando..." : "Entrar"}
        </button>
      </form>

      <div className="login-divider">
        <span>o continúa con</span>
      </div>

      <div className="login-alt-actions">
        <button type="button" className="login-alt-btn">Google</button>
        <button type="button" className="login-alt-btn">GitHub</button>
      </div>
    </article>
  );
};

export default LoginForm;