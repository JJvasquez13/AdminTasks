export default function TaskTable() {
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
                <tr>
                    <td>Ejemplo</td>
                    <td>Descripción de ejemplo</td>
                    <td>2025-08-06</td>
                    <td>2025-08-10</td>
                    <td>En curso</td>
                    <td>
                        <button className="btn btn-sm btn-warning me-2">Editar</button>
                        <button className="btn btn-sm btn-danger">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
