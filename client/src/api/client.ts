import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export const api = axios.create({
  baseURL: `${apiBaseUrl}/api`,
  timeout: 10000
});
