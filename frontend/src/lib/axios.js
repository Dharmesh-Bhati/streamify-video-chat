import axios from "axios";

const Base_URL = import.meta.env.Mode === "development" ? "http://localhost:5001/api" : "/api"

export const axiosInstance = axios.create({
  baseURL: Base_URL,
  withCredentials: true,
});
