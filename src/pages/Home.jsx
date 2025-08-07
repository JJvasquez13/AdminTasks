import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";
import TaskEditor from "../components/TaskEditor";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [csrfToken, setCsrfToken] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (!user) return;

    fetch(`${API_URL}/tasks`, {
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        setTasks(data);
        const token = getCookie("XSRF-TOKEN");
        setCsrfToken(token);
      })
      .catch((err) => {
        console.error("Error al cargar tareas:", err);
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
      if (!res.ok) throw new Error("Error al agregar tarea");
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      await Swal.fire("Éxito", "Tarea agregada con éxito", "success");
    } catch (err) {
      await Swal.fire("Error", "Error al agregar tarea", "error");
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
      if (!res.ok) throw new Error("Error al actualizar tarea");
      const updatedTask = await res.json();
      setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
      setSelectedTask(null);
      await Swal.fire("Éxito", "Tarea actualizada con éxito", "success");
    } catch {
      await Swal.fire("Error", "Error al actualizar tarea", "error");
    }
  };

  const deleteTask = async (task) => {
    if (!task?._id) return;
    try {
      const res = await fetch(`${API_URL}/tasks/${task._id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "X-XSRF-TOKEN": csrfToken },
      });
      if (!res.ok) throw new Error("Error al eliminar tarea");
      setTasks(tasks.filter((t) => t._id !== task._id));
      setSelectedTask(null);
      await Swal.fire("Éxito", "Tarea eliminada con éxito", "success");
    } catch {
      await Swal.fire("Error", "Error al eliminar tarea", "error");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  if (!user) return null;

  return (
    <main className="container py-5" style={{ maxWidth: "1200px" }}>
      <section className="mb-4 text-center">
        <h1 className="fw-bold mb-1">Hola, {user.username || "Usuario"}</h1>
        <p className="text-secondary mb-0">Gestiona tus tareas fácilmente</p>
      </section>

      <section className="mb-5">
        <h2 className="h5 text-primary mb-3">Nueva Tarea</h2>
        <div className="border rounded p-4" style={{ backgroundColor: "#f9fafb" }}>
          <TaskForm onAddTask={addTask} />
        </div>
      </section>

      {selectedTask && (
        <section className="mb-5">
          <h2 className="h5 text-info mb-3">Editar Tarea</h2>
          <div className="border rounded p-4" style={{ backgroundColor: "#f1f5f9" }}>
            <TaskEditor
              task={selectedTask}
              onCancel={() => setSelectedTask(null)}
              onSave={updateTask}
              onDelete={deleteTask}
            />
          </div>
        </section>
      )}

      <section>
        <h2 className="h5 text-success mb-3">Lista de Tareas</h2>
        <div className="border rounded p-3" style={{ backgroundColor: "#fefefe" }}>
          <TaskTable tasks={tasks} onSelectTask={setSelectedTask} />
        </div>
      </section>
    </main>
  );
}
