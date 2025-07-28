import { database } from '../firebase.js';
import { ref, update } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Función para sanitizar texto y prevenir XSS
function sanitizeText(text) {
    if (typeof text !== 'string') {
        return '';
    }
    return text
        .replace(/[<>/'"'&]/g, '') // Eliminar caracteres HTML peligrosos
        .replace(/script/gi, '') // Eliminar la palabra 'script' (case-insensitive)
        .trim(); // Eliminar espacios en blanco iniciales y finales
}

// Función para validar el taskId
function validateTaskId(taskId) {
    if (!taskId || typeof taskId !== 'string' || !taskId.match(/^-[\w-]{19,22}$/)) {
        return false;
    }
    return true;
}

// Alternar estado de completado de una tarea
export function toggleTask(taskId, isCompleted) {
    // Validar taskId
    if (!validateTaskId(taskId)) {
        console.error('Error: taskId inválido o no proporcionado');
        return Promise.reject(new Error('Entrada inválida: ID de tarea no válido'));
    }

    // Validar isCompleted
    if (typeof isCompleted !== 'boolean') {
        console.error('Error: isCompleted debe ser un booleano');
        return Promise.reject(new Error('Entrada inválida: el estado debe ser un booleano'));
    }

    console.log('Alternando tarea:', taskId, isCompleted);
    const taskRef = ref(database, `tasks/${taskId}`);

    return update(taskRef, { completed: isCompleted })
        .then(() => {
            console.log('Tarea actualizada con éxito:', taskId);
            return taskId; // Retornar taskId para confirmar la operación
        })
        .catch((error) => {
            console.error('Error al actualizar tarea:', error);
            throw error; // Propagar el error para manejo externo
        });
}

// Editar el título o texto de una tarea
export function editTask(taskId, element) {
    // Validar taskId
    if (!validateTaskId(taskId)) {
        console.error('Error: taskId inválido o no proporcionado');
        return Promise.reject(new Error('Entrada inválida: ID de tarea no válido'));
    }

    // Validar element
    if (!(element instanceof HTMLElement)) {
        console.error('Error: element no es un elemento HTML válido');
        return Promise.reject(new Error('Entrada inválida: elemento no válido'));
    }

    console.log('Editando tarea:', taskId);
    const isTitle = element.classList.contains('task-title');
    const field = isTitle ? 'title' : 'text';
    const maxLength = isTitle ? 100 : 500;
    const promptMessage = isTitle ? 'Editar título de la tarea:' : 'Editar texto de la tarea:';

    const defaultValue = isTitle && element.textContent === 'Sin título' ? '' : element.textContent;
    const newValue = prompt(promptMessage, defaultValue);

    // Manejar cancelación del prompt
    if (newValue === null) {
        console.log('Edición cancelada por el usuario');
        return Promise.resolve(null); // Resuelve sin error si el usuario cancela
    }

    // Validar y sanitizar el valor
    const sanitizedValue = sanitizeText(newValue);
    if (sanitizedValue === '' || sanitizedValue.length > maxLength) {
        console.error(`Error: el ${field} de la tarea es inválido o excede el límite de ${maxLength} caracteres`);
        return Promise.reject(new Error(`Entrada inválida: el ${field} no puede estar vacío ni exceder ${maxLength} caracteres`));
    }

    const taskRef = ref(database, `tasks/${taskId}`);
    const updates = { [field]: sanitizedValue };

    return update(taskRef, updates)
        .then(() => {
            console.log(`Tarea editada con éxito (${field}):`, taskId);
            element.textContent = sanitizedValue; // Actualizar el DOM directamente
            if (!isTitle) {
                element.classList.remove('completed'); // Remover clase completed si se edita el texto
            }
            return { taskId, field, value: sanitizedValue }; // Retornar datos para confirmar la operación
        })
        .catch((error) => {
            console.error('Error al editar tarea:', error);
            throw error; // Propagar el error para manejo externo
        });
}
