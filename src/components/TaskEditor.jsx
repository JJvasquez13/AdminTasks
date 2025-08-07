import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function TaskEditor({ task, onCancel, onSave, onDelete }) {
  const MAX_SHORT = 75;
  const MAX_LONG = 2000;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Sin iniciar");
  const [charsLeftShort, setCharsLeftShort] = useState(MAX_SHORT);
  const [charsLeftLong, setCharsLeftLong] = useState(MAX_LONG);

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setLongDescription(task.longDescription || "");
      setStartDate(task.startDate ? task.startDate.slice(0, 10) : "");
      setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
      setStatus(task.status || "Sin iniciar");
      setCharsLeftShort(
        MAX_SHORT - (task.description ? task.description.length : 0)
      );
      setCharsLeftLong(
        MAX_LONG - (task.longDescription ? task.longDescription.length : 0)
      );
    }
  }, [task]);

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_SHORT) {
      setDescription(text);
      setCharsLeftShort(MAX_SHORT - text.length);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Alcanzó el límite máximo de caracteres (75) para la descripción corta",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleLongDescriptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_LONG) {
      setLongDescription(text);
      setCharsLeftLong(MAX_LONG - text.length);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Alcanzó el límite máximo de caracteres (2000) para la descripción larga",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description.length > MAX_SHORT) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La descripción corta no puede exceder 75 caracteres",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    if (longDescription.length > MAX_LONG) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La descripción larga no puede exceder 2000 caracteres",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    onSave({
      ...task,
      title,
      description,
      longDescription,
      startDate,
      dueDate,
      status,
    });

    Swal.fire({
      icon: "success",
      title: "Actualizada",
      text: "La tarea ha sido actualizada.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la tarea permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(task);
        Swal.fire("Eliminada!", "La tarea ha sido eliminada.", "success");
      }
    });
  };

  if (!task) return null;

  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Editar tarea</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onCancel}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label>Título</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  maxLength={50}
                />
              </div>
              <div className="mb-3">
                <label>Descripción corta</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                />
                <small className="text-muted">{charsLeftShort} caracteres restantes</small>
              </div>
              <div className="mb-3">
                <label>Descripción larga</label>
                <textarea
                  className="form-control"
                  rows={6}
                  value={longDescription}
                  onChange={handleLongDescriptionChange}
                />
                <small className="text-muted">{charsLeftLong} caracteres restantes</small>
              </div>
              <div className="mb-3">
                <label>Fecha Inicio</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Fecha Final</label>
                <input
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Estado</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Sin iniciar">Sin iniciar</option>
                  <option value="En curso">En curso</option>
                  <option value="Completado">Completado</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Eliminar
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
