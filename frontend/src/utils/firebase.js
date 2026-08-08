
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewos-9d1d3.firebaseapp.com",
  projectId: "interviewos-9d1d3",
  storageBucket: "interviewos-9d1d3.firebasestorage.app",
  messagingSenderId: "446919571873",
  appId: "1:446919571873:web:dcb8c67b9f6475ffdd33e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { auth , provider}