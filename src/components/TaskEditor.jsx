import { useState, useEffect } from 'react';

export default function TaskEditor({ task, onCancel, onSave }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('Sin iniciar');


    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setDescription(task.description || '');
            setStartDate(task.startDate ? task.startDate.slice(0, 10) : '');
            setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : '');
            setStatus(task.status || 'Sin iniciar');

        }
    }, [task]);

    if (!task) return null; // No mostrar nada si no hay tarea seleccionada

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...task,
            title,
            description,
            startDate,
            dueDate,
            status,
        });
    };

    return (
        <div className="card mt-4 p-3 shadow-sm">
            <h4>Editar tarea</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Título</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required maxLength={50} />
                </div>
                <div className="mb-3">
                    <label>Descripción</label>
                    <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} required maxLength={200} />
                </div>
                <div className="mb-3">
                    <label>Fecha Inicio</label>
                    <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Fecha Final</label>
                    <input type="date" className="form-control" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Estado</label>
                    <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="Sin iniciar">Sin iniciar</option>
                        <option value="En curso">En curso</option>
                        <option value="Completado">completado</option>
                    </select>
                </div>


                <button type="submit" className="btn btn-primary me-2">Guardar</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
            </form>
        </div>
    );
}
