export default function TaskTable({ tasks, onSelectTask }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${day}-${month}-${year}`;
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "sin iniciar":
        return <span className="badge bg-danger">Sin iniciar</span>;
      case "en curso":
        return <span className="badge bg-warning text-dark">En proceso</span>;
      case "completado":
        return <span className="badge bg-success">Completado</span>;
      default:
        return <span className="badge bg-light text-dark">{status}</span>;
    }
  };

  if (tasks.length === 0) {
    return <p className="text-center">No hay tareas aún</p>;
  }

  return (
    <>
      <style>
        {`
          .task-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
            padding: 1rem;
          }
          .task-card {
            min-height: 180px;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-radius: 16px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            background: #fff;
            border: 1.5px solid #dee2e6;
            display: flex;
            flex-direction: column;
            padding: 1rem;
            user-select: none;
          }
          .task-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
            border-color: #0d6efd;
          }
          .task-card-title {
            font-weight: 600;
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
            color: #0d6efd;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .task-card-description {
            flex-grow: 1;
            font-size: 0.9rem;
            color: #495057;
            margin-bottom: 1rem;
            height: 4.2rem;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .task-card-dates {
            font-size: 0.85rem;
            color: #6c757d;
            margin-bottom: 0.75rem;
          }
        `}
      </style>

      <div className="task-grid">
        {tasks.map((task) => (
          <div
            key={task.id || task._id}
            className="task-card"
            onClick={() => onSelectTask(task)}
            title={task.description}
          >
            <div className="task-card-title">{task.title}</div>
            <div className="task-card-description">{task.description}</div>
            <div className="task-card-dates">
              <div>
                <strong>Inicio:</strong> {formatDate(task.startDate)}
              </div>
              <div>
                <strong>Final:</strong> {formatDate(task.dueDate)}
              </div>
            </div>
            <div>{getStatusBadge(task.status)}</div>
          </div>
        ))}
      </div>
    </>
  );
}
