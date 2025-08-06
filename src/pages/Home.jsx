import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfile } from '../api/authService'
import TaskForm from '../components/TaskForm'
import TaskTable from '../components/TaskTable'

export default function Home() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        getProfile()
            .then(data => {
                setUser(data.user || data.data?.user)
                setLoading(false)
            })
            .catch(() => {
                navigate('/login')
            })
    }, [])

    if (loading) return <div className="container mt-5">Cargando...</div>

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Bienvenido, {user?.username || 'Usuario'}</h2>
            <TaskForm />
            <TaskTable />
        </div>
    )
}
