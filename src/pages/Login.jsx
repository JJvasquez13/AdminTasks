import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <div className="container mt-5">
            <h2>Iniciar Sesión</h2>
            <form>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" />
                </div>
                <div className="mb-3">
                    <label>Contraseña</label>
                    <input type="password" className="form-control" />
                </div>
                <button className="btn btn-primary">Entrar</button>
                <p className="mt-3">
                    ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
                </p>
            </form>
        </div>
    )
}
