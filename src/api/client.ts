import axios from 'axios';

const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000
});

client.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  config.headers['Content-Type'] = 'application/json';
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error?.response?.data || error)
);

export default client;
