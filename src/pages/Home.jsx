import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskTable from '../components/TaskTable';
import TaskEditor from '../components/TaskEditor';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
    const { user, loading } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [csrfToken, setCsrfToken] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        if (!user) return;

        fetch(`${API_URL}/tasks`, {
            credentials: 'include',
        })
            .then(async (res) => {
                const data = await res.json();
                setTasks(data);
                const token = getCookie('XSRF-TOKEN');
                setCsrfToken(token);
            })
            .catch((err) => {
                console.error('Error al cargar tareas:', err);
            });
    }, [user]);

    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : '';
    };

    const addTask = async (taskData) => {
        try {
            const res = await fetch(`${API_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken,
                },
                credentials: 'include',
                body: JSON.stringify(taskData),
            });
            if (!res.ok) {
                throw new Error('Error al agregar tarea');
            }
            const newTask = await res.json();
            setTasks([...tasks, newTask]);
        } catch (err) {
            console.error('Error al agregar tarea:', err);
        }
    };

    const updateTask = async (taskData) => {
        try {
            const res = await fetch(`${API_URL}/tasks/${taskData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken,
                },
                credentials: 'include',
                body: JSON.stringify(taskData),
            });
            if (!res.ok) {
                throw new Error('Error al actualizar tarea');
            }
            const updatedTask = await res.json();
            setTasks(tasks.map(t => (t._id === updatedTask._id ? updatedTask : t)));
            setSelectedTask(null);
        } catch (err) {
            console.error('Error al actualizar tarea:', err);
        }
    };

    if (loading) return <div className="container mt-5">Cargando...</div>;
    if (!user) return null;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Bienvenido, {user.username || 'Usuario'}</h2>
            <TaskForm onAddTask={addTask} />
            <TaskTable tasks={tasks} onSelectTask={setSelectedTask} />
            <TaskEditor
                task={selectedTask}
                onCancel={() => setSelectedTask(null)}
                onSave={updateTask}
            />
        </div>
    );
}