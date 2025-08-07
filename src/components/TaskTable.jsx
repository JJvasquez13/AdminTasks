export default function TaskList({ tasks, onSelectTask }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString; // Backend returns DD/MM/YYYY
  };

  return (
    <div className="container my-4">
      {tasks.length === 0 ? (
        <div
          className="card shadow-sm border-0 text-center p-5"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <p className="text-muted mb-0 fw-semibold">No hay tareas aún</p>
        </div>
      ) : (
        <div className="row g-3">
          {tasks.map((task) => (
            <div key={task.id || task._id} className="col-12 col-md-6 col-lg-4">
              <div
                className="card shadow-sm border-0 h-100"
                style={{
                  backgroundColor: "#FFFFFF",
                  transition: "transform 0.2s, border-color 0.2s",
                }}
                onClick={() => onSelectTask(task)}
                role="button"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.borderColor = "#FFCA28";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <div className="card-body p-3">
                  <h5
                    className="card-title fw-bold mb-2"
                    style={{ color: "#2C3E50" }}
                  >
                    {task.title}
                  </h5>
                  <p
                    className="card-text text-muted mb-3"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {task.description}
                  </p>
                  <div className="d-flex justify-content-between mb-2">
                    <small className="text-muted fw-semibold">
                      Inicio: {formatDate(task.startDate)}
                    </small>
                    <small className="text-muted fw-semibold">
                      Fin: {formatDate(task.dueDate)}
                    </small>
                  </div>
                  <span
                    className="badge rounded-pill"
                    style={{
                      backgroundColor:
                        task.status === "Sin iniciar"
                          ? "#E74C3C"
                          : task.status === "En curso"
                          ? "#3498DB"
                          : "#2ECC71",
                      color: "#FFFFFF",
                      fontSize: "0.85rem",
                      padding: "0.5em 1em",
                    }}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
