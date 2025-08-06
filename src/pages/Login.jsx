import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosInstance'

export default function Login() {
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

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await api.post('/auth/login', { email, password }, {
                headers: { 'X-XSRF-TOKEN': xsrfToken },
            })
            navigate('/home')
        } catch (err) {
            alert('Credenciales incorrectas')
        }
    }

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
    )
}
