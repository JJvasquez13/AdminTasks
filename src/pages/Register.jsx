import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [xsrfToken, setXsrfToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/')
      .then(() => {
        const token = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'))?.[2];
        if (token) setXsrfToken(token);
      })
      .catch(err => console.error('Error al obtener XSRF-TOKEN:', err));
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, email, password }, {
        headers: { 'X-XSRF-TOKEN': xsrfToken }
      });
      toast.success('Registro exitoso. Por favor, inicia sesión.', { autoClose: 1500 });
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al registrar usuario', { autoClose: 2000 });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start"
      style={{
        minHeight: '100vh',
        backgroundColor: "#c3d9eeff",
        paddingTop: '4rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        className="card shadow"
        style={{
          width: '380px',
          borderRadius: '15px',
          padding: '2rem',
          backgroundColor: 'white',
          boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
          transition: 'transform 0.25s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <div className="text-center mb-3" style={{ color: '#0d6efd' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="currentColor"
            className="bi bi-person-fill-add"
            viewBox="0 0 16 16"
            style={{ marginBottom: '12px' }}
          >
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
          </svg>
          <h2 style={{ fontWeight: '700' }}>Registro</h2>
        </div>
        <form onSubmit={handleRegister} noValidate>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">Nombre de Usuario</label>
            <input
              id="username"
              type="text"
              className="form-control"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Tu nombre de usuario"
              required
              style={{ transition: 'box-shadow 0.3s ease' }}
              onFocus={e => (e.target.style.boxShadow = '0 0 8px #0d6efd')}
              onBlur={e => (e.target.style.boxShadow = 'none')}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              required
              style={{ transition: 'box-shadow 0.3s ease' }}
              onFocus={e => (e.target.style.boxShadow = '0 0 8px #0d6efd')}
              onBlur={e => (e.target.style.boxShadow = 'none')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ transition: 'box-shadow 0.3s ease' }}
              onFocus={e => (e.target.style.boxShadow = '0 0 8px #0d6efd')}
              onBlur={e => (e.target.style.boxShadow = 'none')}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 fw-bold"
            style={{ padding: '0.65rem', fontSize: '1.1rem', borderRadius: '10px' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#198754')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '')}
          >
            Registrarse
          </button>
        </form>
        <p className="mt-3 text-center">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={{ color: '#0d6efd', fontWeight: '600' }}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
