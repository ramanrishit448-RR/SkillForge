
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "skillforge-505b7.firebaseapp.com",
  projectId: "skillforge-505b7",
  storageBucket: "skillforge-505b7.firebasestorage.app",
  messagingSenderId: "361889714950",
  appId: "1:361889714950:web:cbd09b63d11d15e5c48487"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { auth , provider}
