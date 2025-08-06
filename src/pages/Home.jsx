import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskTable from '../components/TaskTable';

export default function Home() {
    const { user, loading } = useAuth();

    if (loading) return <div className="container mt-5">Cargando...</div>;
    if (!user) return null;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Bienvenido, {user.username || 'Usuario'}</h2>
            <TaskForm />
            <TaskTable />
        </div>
    );
}