import { database } from '../firebase.js';
import { ref, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Función para sanitizar texto y prevenir XSS
function sanitizeText(text) {
    if (typeof text !== 'string') {
        return '';
    }
    return text
        .replace(/[<>"'&]/g, '') // Eliminar caracteres HTML peligrosos
        .replace(/script/gi, '') // Eliminar la palabra 'script' (case-insensitive)
        .trim();
}

// Guardar tarea en Realtime Database
export function saveTask(taskText) {
    console.log('Intentando guardar tarea:', taskText);

    // Validar y sanitizar el texto de la tarea
    const sanitizedText = sanitizeText(taskText);
    if (!sanitizedText || sanitizedText.length > 500) {
        console.error('Error: el texto de la tarea es inválido o excede el límite de 500 caracteres');
        return Promise.reject(new Error('Entrada inválida: el texto no puede estar vacío ni exceder 500 caracteres'));
    }

    // Solicitar título
    const title = prompt('Ingresa el título de la tarea:');
    const sanitizedTitle = sanitizeText(title || 'Sin título');
    if (sanitizedTitle.length > 100) {
        console.error('Error: el título excede el límite de 100 caracteres');
        return Promise.reject(new Error('Entrada inválida: el título no puede exceder 100 caracteres'));
    }

    const tasksRef = ref(database, 'tasks');
    const newTask = {
        text: sanitizedText,
        title: sanitizedTitle,
        completed: false,
        createdAt: new Date().toISOString()
    };

    return push(tasksRef, newTask)
        .then((ref) => {
            console.log('Tarea guardada con ID:', ref.key);
            return ref.key; // Retornar el ID de la tarea
        })
        .catch((error) => {
            console.error('Error al guardar tarea:', error);
            throw error;
        });
}
