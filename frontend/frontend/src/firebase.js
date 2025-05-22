import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBwHWgULB4xZxmRsUz96LIESmh3kWr0OZs",
  authDomain: "signuppage-8061d.firebaseapp.com",
  projectId: "signuppage-8061d",
  storageBucket: "signuppage-8061d.firebasestorage.app",
  messagingSenderId: "365636183766",
  appId: "1:365636183766:web:38bfce8a98232bb6bacb77",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
};
