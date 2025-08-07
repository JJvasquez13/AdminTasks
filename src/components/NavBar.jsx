import { useAuth } from '../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import { logout } from '../api/authService';

export default function NavBar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/login');
    } catch (error) {
      alert('Error al cerrar sesión: ' + (error.response?.data?.message || error.message));
    }
  };

  const activeClass = ({ isActive }) =>
    isActive
      ? "btn btn-light text-primary fw-semibold me-2"
      : "nav-link text-white me-2";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/home">
          TaskManager
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          {user ? (
            <ul className="navbar-nav align-items-center">
              <li className="nav-item me-3">
                <NavLink className="nav-link text-white fw-semibold" to="/profile">
                  {user.username || 'Perfil'}
                </NavLink>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/login" className={activeClass}>
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className={activeClass}>
                  Registro
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
