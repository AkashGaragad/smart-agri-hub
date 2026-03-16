import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const loginUser = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const registerUser = (data: { name: string; email: string; password: string; role: string }) =>
  api.post("/auth/register", data);

// Crops
export const addCrop = (data: { cropName: string; quality: string; quantity: number; minPrice: number }) =>
  api.post("/crops/add", data);

export const getCrops = () => api.get("/crops");

// Fertilizers
export const addFertilizer = (data: { name: string; price: number; quantity: number; description: string }) =>
  api.post("/fertilizers/add", data);

export const getFertilizers = () => api.get("/fertilizers");

// Orders
export const createOrder = (data: Record<string, unknown>) =>
  api.post("/orders/create", data);

export const getOrders = () => api.get("/orders");

export default api;
