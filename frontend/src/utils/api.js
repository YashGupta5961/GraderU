import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://graderu-api.onrender.com/api/v1"
      : "http://localhost:4000/api/v1",
});

export default api;
