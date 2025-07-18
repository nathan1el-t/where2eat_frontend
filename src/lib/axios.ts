import axios from "axios";
// const BASE_URL = "http://localhost:8080/api";
// const BASE_URL = "http://3.107.252.27:8080/api"
const BASE_URL = "https://where2eat-backend-ppik.onrender.com"
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default api;
