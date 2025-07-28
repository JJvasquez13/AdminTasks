import { saveTask } from './tasks/create.js';
import { loadTasks } from './tasks/read.js';
import { toggleTask, editTask } from './tasks/update.js';
import { deleteTask } from './tasks/delete.js';

// Función para sanitizar entrada del formulario
function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    return input
        .replace(/[<>"'&]/g, '')
        .replace(/script/gi, '')
        .trim();
}

// Enviar formulario para añadir tarea
document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const taskText = sanitizeInput(taskInput.value.trim());

    if (taskText) {
        saveTask(taskText)
            .then(() => {
                taskInput.value = '';
                loadTasks(); // Recargar tareas para reflejar el cambio
            })
            .catch((error) => {
                console.error('Error al añadir tarea:', error);
                alert('Error al guardar la tarea: ' + error.message);
            });
    } else {
        alert('Por favor, introduce una tarea válida');
    }
});

// Cargar tareas al iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

// Exponer funciones globalmente para compatibilidad (aunque no se usan directamente)
window.toggleTask = toggleTask;
window.editTask = editTask;
window.deleteTask = deleteTask;
