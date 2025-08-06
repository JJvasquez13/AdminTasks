import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axiosInstance'

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [xsrfToken, setXsrfToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        api.get('/')
            .then(() => {
                const token = getCookie('XSRF-TOKEN')
                if (token) setXsrfToken(token)
            })
            .catch(err => console.error('Error al obtener XSRF-TOKEN', err))
    }, [])

    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
        return match ? decodeURIComponent(match[2]) : ''
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await api.post('/auth/register',
                { username, email, password },
                { headers: { 'X-XSRF-TOKEN': xsrfToken } }
            )
            navigate('/login')
        } catch (err) {
            alert('Error al registrar usuario')
        }
    }

    return (
        <div className="container mt-5">
            <h2>Registro</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label>Nombre</label>
                    <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Contraseña</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button className="btn btn-success">Registrarse</button>
                <p className="mt-3">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </form>
        </div>
    )
}
