import { database } from '../firebase.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { toggleTask } from './update.js';
import { deleteTask } from './delete.js';
import { editTask } from './update.js';

// Función para sanitizar texto y prevenir XSS
function sanitizeText(text) {
    if (typeof text !== 'string') {
        return '';
    }
    return text
        .replace(/[<>/'"'&]/g, '') // Eliminar caracteres HTML peligrosos
        .replace(/script/gi, '') // Eliminar la palabra 'script' (case-insensitive)
        .trim();
}

// Función para validar el formato de una tarea
function validateTask(task, taskId) {
    return (
        taskId &&
        typeof taskId === 'string' &&
        taskId.match(/^-[\w-]{19,22}$/) && // Permitir letras, números, guiones y guiones bajos, 19-22 caracteres
        task &&
        typeof task === 'object' &&
        typeof task.text === 'string' &&
        task.text.length <= 500 &&
        (typeof task.title === 'string' && task.title.length <= 100 || task.title === undefined) && // Permitir título opcional
        typeof task.completed === 'boolean' &&
        typeof task.createdAt === 'string' &&
        task.createdAt.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    );
}

// Cargar tareas desde Firebase Realtime Database
export function loadTasks() {
    console.log('Cargando tareas...');
    const tasksRef = ref(database, 'tasks');
    const taskList = document.getElementById('taskList');

    if (!taskList) {
        console.error('Error: Elemento #taskList no encontrado en el DOM');
        return;
    }

    onValue(tasksRef, (snapshot) => {
        console.log('Datos recibidos del servidor:', snapshot.val());
        taskList.innerHTML = ''; // Limpiar la lista

        const tasks = snapshot.val();
        if (!tasks) {
            console.log('No hay tareas para mostrar');
            return;
        }

        Object.entries(tasks).forEach(([taskId, task]) => {
            if (!validateTask(task, taskId)) {
                console.warn(`Tarea con ID ${taskId} tiene un formato inválido y se omitirá`);
                return;
            }

            const li = document.createElement('li');
            li.dataset.id = taskId; // Almacenar ID en data-id

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.classList.add('task-checkbox');

            const title = document.createElement('strong');
            title.textContent = sanitizeText(task.title || 'Sin título'); // Usar "Sin título" por defecto
            title.classList.add('task-title');

            const span = document.createElement('span');
            span.textContent = sanitizeText(task.text); // Mostrar texto
            span.classList.add('task-text');
            span.classList.toggle('completed', task.completed); // Añadir clase completed si está completada

            const button = document.createElement('button');
            button.textContent = 'Eliminar';
            button.classList.add('delete-button');

            li.appendChild(checkbox);
            li.appendChild(title);
            li.appendChild(span);
            li.appendChild(button);
            taskList.appendChild(li);
        });

        // Delegación de eventos
        taskList.addEventListener('change', (e) => {
            if (e.target.classList.contains('task-checkbox')) {
                const taskId = e.target.parentElement.dataset.id;
                toggleTask(taskId, e.target.checked).catch((error) => {
                    console.error('Error al alternar tarea:', error);
                    alert('Error al actualizar la tarea: ' + error.message);
                });
            }
        });

        taskList.addEventListener('dblclick', (e) => {
            if (e.target.classList.contains('task-title') || e.target.classList.contains('task-text')) {
                const taskId = e.target.parentElement.dataset.id;
                editTask(taskId, e.target).catch((error) => {
                    console.error('Error al editar tarea:', error);
                    alert('Error al editar la tarea: ' + error.message);
                });
            }
        });

        taskList.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-button')) {
                const taskId = e.target.parentElement.dataset.id;
                e.target.disabled = true; // Deshabilitar botón para evitar múltiples clics
                deleteTask(taskId)
                    .then(() => {
                        e.target.disabled = false; // Rehabilitar botón tras completar
                    })
                    .catch((error) => {
                        e.target.disabled = false; // Rehabilitar botón en caso de error
                        console.error('Error al eliminar tarea:', error);
                        alert('Error al eliminar la tarea: ' + error.message);
                    });
            }
        });
    }, (error) => {
        console.error('Error al cargar tareas:', error);
        alert('Error al cargar las tareas: ' + error.message);
    });
}
