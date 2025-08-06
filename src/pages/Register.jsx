import { Link } from 'react-router-dom'

export default function Register() {
    return (
        <div className="container mt-5">
            <h2>Registro</h2>
            <form>
                <div className="mb-3">
                    <label>Nombre</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" />
                </div>
                <div className="mb-3">
                    <label>Contraseña</label>
                    <input type="password" className="form-control" />
                </div>
                <button className="btn btn-success">Registrarse</button>
                <p className="mt-3">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </form>
        </div>
    )
}
