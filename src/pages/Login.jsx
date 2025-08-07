import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [xsrfToken, setXsrfToken] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    api
      .get("/")
      .then(() => {
        const token = document.cookie.match(
          new RegExp("(^| )XSRF-TOKEN=([^;]+)")
        )?.[2];
        if (token) setXsrfToken(token);
      })
      .catch((err) => console.error("Error al obtener XSRF-TOKEN:", err));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/auth/login",
        { email, password },
        {
          headers: { "X-XSRF-TOKEN": xsrfToken },
        }
      );
      setUser(response.data.user || response.data.data?.user);
      toast.success("Inicio de sesión exitoso", {
        autoClose: 1500,
        className: "custom-toast",
      });
      navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.message || "Credenciales incorrectas", {
        autoClose: 2000,
        className: "custom-toast",
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start"
      style={{
        minHeight: "100vh",
        backgroundColor: "#c3d9eeff",
        paddingTop: "4rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <style>
        {`
          .custom-toast {
            background-color: #f1f1f1 !important;
            color: #333 !important;
            font-weight: 500;
            border-radius: 10px;
          }
        `}
      </style>
      <ToastContainer />
      <div
        className="card shadow"
        style={{
          width: "380px",
          borderRadius: "15px",
          padding: "2rem",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          transition: "transform 0.25s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <div className="text-center mb-3" style={{ color: "#0d6efd" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="currentColor"
            className="bi bi-lock-fill"
            viewBox="0 0 16 16"
            style={{ marginBottom: "0.5rem" }}
          >
            <path d="M8 1a3 3 0 0 0-3 3v3h6V4a3 3 0 0 0-3-3zM4.5 7V4a3.5 3.5 0 1 1 7 0v3h.5A1.5 1.5 0 0 1 13.5 8.5v6A1.5 1.5 0 0 1 12 16H4a1.5 1.5 0 0 1-1.5-1.5v-6A1.5 1.5 0 0 1 4.5 7z" />
          </svg>
          <h2 style={{ fontWeight: "700" }}>Iniciar Sesión</h2>
        </div>
        <form onSubmit={handleLogin} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              required
              autoComplete="email"
              style={{ transition: "box-shadow 0.3s ease" }}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 8px #0d6efd")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              style={{ transition: "box-shadow 0.3s ease" }}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 8px #0d6efd")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            style={{
              padding: "0.65rem",
              fontSize: "1.1rem",
              borderRadius: "10px",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#0b5ed7")
            }
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
