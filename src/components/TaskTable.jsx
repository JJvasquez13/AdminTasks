export default function TaskTable({ tasks, onSelectTask }) {
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return (
        <table className="table table-bordered table-hover">
            <thead className="table-light">
                <tr>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Final</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                {tasks.length === 0 && (
                    <tr>
                        <td colSpan="5" className="text-center">No hay tareas aún</td>
                    </tr>
                )}
                {tasks.map((task) => (
                    <tr key={task.id || task._id} onClick={() => onSelectTask(task)} style={{ cursor: 'pointer' }}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{formatDate(task.startDate)}</td>
                        <td>{formatDate(task.dueDate)}</td>
                        <td>{task.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
