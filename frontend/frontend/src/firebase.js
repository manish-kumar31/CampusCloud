// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ You were missing this
import { getApps, initializeApp as initializeAppOnce } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAglADYRJpJIjXN2eYxGydcOj7effOfUHg",
  authDomain: "logini-c4a0a.firebaseapp.com",
  projectId: "logini-c4a0a",
  storageBucket: "logini-c4a0a.firebasestorage.app",
  messagingSenderId: "324831277168",
  appId: "1:324831277168:web:fe6cda0217761356f6c4b5"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeAppOnce(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { auth };
