import { useState } from 'react';

export default function TaskForm({ onAddTask }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('Sin iniciar');


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description || !startDate || !dueDate) return;

        const newTask = {
            title,
            description,
            startDate,
            dueDate,
            status,
        };

        onAddTask(newTask);

        // Limpiar formulario
        setTitle('');
        setDescription('');
        setStartDate('');
        setDueDate('');
        setStatus('Sin iniciar');
    };

    return (
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
                        onChange={e => setDescription(e.target.value)}
                    />
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
    );
}
