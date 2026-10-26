import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCBhgu_eGLK7Cp9PA4AOIQMMG3YB0_Pa9I",
  authDomain: "witttingtv.firebaseapp.com",
  projectId: "witttingtv",
  storageBucket: "witttingtv.firebasestorage.app",
  messagingSenderId: "385187670073",
  appId: "1:385187670073:web:e5b8af031785422cea85e8",
  measurementId: "G-7YW8CHFYRY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
