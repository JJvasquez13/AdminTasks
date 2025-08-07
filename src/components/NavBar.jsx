import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../api/authService";

export default function NavBar({ onError }) {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/login");
    } catch (error) {
      onError(
        "Error al cerrar sesión: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm fixed-top"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand fw-bold"
          href="/home"
          style={{ color: "#FFCA28" }}
        >
          TaskManager
        </a>
        <div className="navbar-nav ms-auto py-3">
          {user ? (
            <>
              <a
                className="nav-link btn mx-3"
                href="/profile"
                style={{ color: "#2ECC71" }}
              >
                {user.username || "Perfil"}
              </a>
              <button
                className="nav-link btn btn-outline-danger mx-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="nav-link btn mx-3"
                to="/login"
                style={{ color: "#3498DB" }}
              >
                Login
              </Link>
              <Link
                className="nav-link btn mx-3"
                to="/register"
                style={{ color: "#3498DB" }}
              >
                Registro
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
