import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDGv-sN5-wxMJow9hV2Ab8hICd_BjR1n0",
    authDomain: "administradortareas-936bb.firebaseapp.com",
    projectId: "administradortareas-936bb",
    storageBucket: "administradortareas-936bb.appspot.com",
    messagingSenderId: "9190881701",
    appId: "1:9190881701:web:2cc692c8c1fb34d4a8904c"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };