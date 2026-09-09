import axios from "axios";

const api =
axios.create({

  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:8000" : "https://skillforge-1-b5t9.onrender.com"),
  withCredentials: true,
});

export default api;
