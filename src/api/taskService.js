const API = 'http://localhost:5003/task'; // Ajusta si tu endpoint es otro

export const getTasks = async () => {
    const res = await fetch(API);
    if (!res.ok) throw new Error('Error al obtener tareas');
    return await res.json();
};

export const createTask = async (taskData) => {
    const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
    });
    if (!res.ok) throw new Error('Error al crear tarea');
    return await res.json();
};

export const deleteTask = async (id) => {
    const res = await fetch(`${API}/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar tarea');
};

export const updateTask = async (id, taskData) => {
    const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
    });
    if (!res.ok) throw new Error('Error al actualizar tarea');
    return await res.json();
};
