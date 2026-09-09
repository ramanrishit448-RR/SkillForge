
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "skillforge-505b7-f8829.firebaseapp.com",
  projectId: "skillforge-505b7-f8829",
  storageBucket: "skillforge-505b7-f8829.firebasestorage.app",
  messagingSenderId: "707199638445",
  appId: "1:707199638445:web:4199f54e4903b258361f24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { auth , provider}
