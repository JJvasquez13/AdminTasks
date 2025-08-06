import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [xsrfToken, setXsrfToken] = useState('');
    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
        api.get('/')
            .then(() => {
                const token = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'))?.[2];
                console.log('XSRF-TOKEN obtenido:', token);
                if (token) setXsrfToken(token);
            })
            .catch(err => console.error('Error al obtener XSRF-TOKEN:', err));
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password }, {
                headers: { 'X-XSRF-TOKEN': xsrfToken },
            });
            console.log('Respuesta del login:', response.data);
            setUser(response.data.user || response.data.data?.user);
            toast.success('Inicio de sesión exitoso', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/home');
        } catch (err) {
            console.error('Error en login:', err.response?.data || err.message);
            toast.error(err.response?.data?.message || 'Credenciales incorrectas', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="container mt-5">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Contraseña</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button className="btn btn-primary">Entrar</button>
            </form>
        </div>
    );
}