export default function TaskTable({ tasks }) {
    return (
        <table className="table table-bordered table-hover">
            <thead className="table-light">
                <tr>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Final</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(task => (
                    <tr key={task._id || task.id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.startDate}</td>
                        <td>{task.dueDate}</td>
                        <td>{task.status}</td>
                        <td>
                            <button className="btn btn-sm btn-warning me-2">Editar</button>
                            <button className="btn btn-sm btn-danger">Eliminar</button>
                        </td>
                    </tr>
                ))}
                {tasks.length === 0 && (
                    <tr>
                        <td colSpan="6" className="text-center">No hay tareas aún</td>
                    </tr>
                )}
            </tbody>

        </table>
    );
}
