import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TaskForm({ onAddTask }) {
    const MAX_LENGTH = 75;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('Sin iniciar');
    const [charsLeft, setCharsLeft] = useState(MAX_LENGTH);

    const handleDescriptionChange = (e) => {
        const text = e.target.value;
        if (text.length <= MAX_LENGTH) {
            setDescription(text);
            setCharsLeft(MAX_LENGTH - text.length);
        } else {
            toast.error('Alcanzó el límite máximo de caracteres (75)');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description || !startDate || !dueDate) return;
        if (description.length > MAX_LENGTH) {
            toast.error('La descripción no puede exceder 75 caracteres');
            return;
        }

        const newTask = {
            title,
            description,
            startDate,
            dueDate,
            status,
        };

        onAddTask(newTask);

        setTitle('');
        setDescription('');
        setCharsLeft(MAX_LENGTH);
        setStartDate('');
        setDueDate('');
        setStatus('Sin iniciar');
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <form className="mb-4" onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Título"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Descripción"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                        <small className="text-muted">{charsLeft} caracteres restantes</small>
                    </div>
                    <div className="col-md-2">
                        <input
                            type="date"
                            className="form-control"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="date"
                            className="form-control"
                            value={dueDate}
                            onChange={e => setDueDate(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <select
                            className="form-select"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option value="Sin iniciar">Sin iniciar</option>
                            <option value="En curso">En curso</option>
                            <option value="Completado">Completado</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary w-100">Agregar tarea</button>
                    </div>
                </div>
            </form>
        </>
    );
}
