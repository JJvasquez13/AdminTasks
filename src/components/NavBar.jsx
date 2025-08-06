import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
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

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/home">TaskManager</a>
                <div className="navbar-nav ms-auto">
                    {user ? (
                        <>
                            <a className="nav-link" href="/profile">{user.username || 'Perfil'}</a>
                            <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link className="nav-link" to="/login">Login</Link>
                            <Link className="nav-link" to="/register">Registro</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}