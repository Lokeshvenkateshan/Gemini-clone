// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD4xTThbKEn6KQ7fQBViw1vk_cG5Bd5v8",
  authDomain: "login-946db.firebaseapp.com",
  projectId: "login-946db",
  storageBucket: "login-946db.firebasestorage.app",
  messagingSenderId: "890283299983",
  appId: "1:890283299983:web:633cca01c07a343ef9ccfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app)
export default app;