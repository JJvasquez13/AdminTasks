import TaskForm from '../components/TaskForm'
import TaskTable from '../components/TaskTable'

export default function Home() {
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Gestor de Tareas</h2>
            <TaskForm />
            <TaskTable />
        </div>
    )
}
