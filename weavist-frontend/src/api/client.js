import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000/api';

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('weavist_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
