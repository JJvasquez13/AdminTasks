import { database } from '../firebase.js';
import { ref, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Función para validar el taskId
function validateTaskId(taskId) {
    if (!taskId || typeof taskId !== 'string' || !taskId.match(/^-[\w-]{19,22}$/)) {
        return false;
    }
    return true;
}

// Eliminar tarea
export function deleteTask(taskId) {
    // Validar taskId
    if (!validateTaskId(taskId)) {
        console.error('Error: taskId inválido o no proporcionado');
        return Promise.reject(new Error('Entrada inválida: ID de tarea no válido'));
    }

    console.log('Eliminando tarea:', taskId);

    // Confirmación de eliminación
    if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        console.log('Eliminación cancelada por el usuario');
        return Promise.resolve(null); // Resuelve sin error si el usuario cancela
    }

    const taskRef = ref(database, `tasks/${taskId}`);
    return remove(taskRef)
        .then(() => {
            console.log('Tarea eliminada con éxito:', taskId);
            return taskId; // Retornar taskId para confirmar la eliminación
        })
        .catch((error) => {
            console.error('Error al eliminar tarea:', error);
            throw error; // Propagar el error para manejo externo
        });
}
