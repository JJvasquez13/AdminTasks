import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";
import TaskEditor from "../components/TaskEditor";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [csrfToken, setCsrfToken] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    fetch(`${API_URL}/tasks`, {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Error al cargar tareas");
        }
        const data = await res.json();
        setTasks(data);
        const token = getCookie("XSRF-TOKEN");
        setCsrfToken(token);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [user]);

  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) : "";
  };

  const addTask = async (taskData) => {
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(taskData),
      });
      if (!res.ok) {
        throw new Error("Error al agregar tarea");
      }
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTask = async (taskData) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${taskData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(taskData),
      });
      if (!res.ok) {
        throw new Error("Error al actualizar tarea");
      }
      const updatedTask = await res.json();
      setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
      setSelectedTask(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "X-XSRF-TOKEN": csrfToken,
        },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Error al eliminar tarea");
      }
      setTasks(tasks.filter((t) => t._id !== taskId));
      setSelectedTask(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  if (loading)
    return <div className="container mt-5 text-center">Cargando...</div>;
  if (!user) return null;

  return (
    <div className="min-vh-100 pt-5" style={{ backgroundColor: "#F5F7FA" }}>
      <div className="container mt-5">
        <div
          className="card shadow-sm border-0"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div className="card-body d-flex justify-content-between align-items-center">
            <h2 className="fw-bold mb-0" style={{ color: "#2C3E50" }}>
              Bienvenido, {user.username || "Usuario"}
            </h2>
            <TaskForm onAddTask={addTask} onError={setError} />
          </div>
        </div>
        <div className="mt-4">
          <TaskTable tasks={tasks} onSelectTask={setSelectedTask} />
          <TaskEditor
            task={selectedTask}
            onCancel={() => setSelectedTask(null)}
            onSave={updateTask}
            onDelete={deleteTask}
            onError={setError}
          />
        </div>
      </div>
      {error && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div className="modal-header border-0">
                <h5
                  className="modal-title fw-bold"
                  style={{ color: "#E74C3C" }}
                >
                  Error
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseError}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>{error}</p>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={handleCloseError}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
