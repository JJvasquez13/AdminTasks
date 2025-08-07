import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function TaskForm({ onAddTask, onError }) {
  const MAX_SHORT = 75;
  const MAX_LONG = 2000;

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Sin iniciar");
  const [charsLeftShort, setCharsLeftShort] = useState(MAX_SHORT);
  const [charsLeftLong, setCharsLeftLong] = useState(MAX_LONG);

  const formatToDDMMYYYY = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatToYYYYMMDD = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_SHORT) {
      setDescription(text);
      setCharsLeftShort(MAX_SHORT - text.length);
    } else {
      onError(
        "Alcanzó el límite máximo de caracteres (75) para la descripción corta"
      );
    }
  };

  const handleLongDescriptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_LONG) {
      setLongDescription(text);
      setCharsLeftLong(MAX_LONG - text.length);
    } else {
      onError(
        "Alcanzó el límite máximo de caracteres (2000) para la descripción larga"
      );
    }
  };

  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(formatToDDMMYYYY(date));
  };

  const handleDueDateChange = (e) => {
    const date = e.target.value;
    setDueDate(formatToDDMMYYYY(date));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !startDate || !dueDate) {
      onError("Todos los campos obligatorios deben estar completos");
      return;
    }
    if (description.length > MAX_SHORT) {
      onError("La descripción corta no puede exceder 75 caracteres");
      return;
    }
    if (longDescription.length > MAX_LONG) {
      onError("La descripción larga no puede exceder 2000 caracteres");
      return;
    }

    const [startDay, startMonth, startYear] = startDate.split("/").map(Number);
    const [dueDay, dueMonth, dueYear] = dueDate.split("/").map(Number);
    const startDateObj = new Date(startYear, startMonth - 1, startDay);
    const dueDateObj = new Date(dueYear, dueMonth - 1, dueDay);
    if (startDateObj > dueDateObj) {
      onError(
        "La fecha de inicio no puede ser posterior a la fecha de finalización"
      );
      return;
    }

    const newTask = {
      title,
      description,
      longDescription,
      startDate,
      dueDate,
      status,
    };

    onAddTask(newTask);
    setTitle("");
    setDescription("");
    setLongDescription("");
    setCharsLeftShort(MAX_SHORT);
    setCharsLeftLong(MAX_LONG);
    setStartDate("");
    setDueDate("");
    setStatus("Sin iniciar");
    setShowModal(false);
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setLongDescription("");
    setCharsLeftShort(MAX_SHORT);
    setCharsLeftLong(MAX_LONG);
    setStartDate("");
    setDueDate("");
    setStatus("Sin iniciar");
    setShowModal(false);
  };

  return (
    <>
      <button
        className="btn d-flex align-items-center gap-2"
        style={{ backgroundColor: "#FFCA28", color: "#2C3E50" }}
        onClick={() => setShowModal(true)}
      >
        <FaPlus /> Agregar Nueva Tarea
      </button>
      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div
              className="modal-content"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <form onSubmit={handleSubmit}>
                <div className="modal-header border-0">
                  <h5
                    className="modal-title fw-bold"
                    style={{ color: "#FFCA28" }}
                  >
                    Nueva Tarea
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCancel}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Título</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ingrese el título de la tarea"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      maxLength={50}
                    />
                    <small className="text-muted">Máximo 50 caracteres</small>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Descripción corta
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ingrese una breve descripción"
                      value={description}
                      onChange={handleDescriptionChange}
                      required
                    />
                    <small className="text-muted">
                      {charsLeftShort} caracteres restantes
                    </small>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Descripción larga
                    </label>
                    <textarea
                      className="form-control"
                      rows={5}
                      placeholder="Ingrese una descripción detallada (opcional)"
                      value={longDescription}
                      onChange={handleLongDescriptionChange}
                      maxLength={MAX_LONG}
                    />
                    <small className="text-muted">
                      {charsLeftLong} caracteres restantes
                    </small>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Fecha de Inicio
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={startDate ? formatToYYYYMMDD(startDate) : ""}
                        onChange={handleStartDateChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Fecha de Finalización
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={dueDate ? formatToYYYYMMDD(dueDate) : ""}
                        onChange={handleDueDateChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Estado</label>
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
                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    style={{ color: "#2C3E50", borderColor: "#2C3E50" }}
                    onClick={handleCancel}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "#2ECC71", color: "#FFFFFF" }}
                  >
                    Guardar Tarea
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
