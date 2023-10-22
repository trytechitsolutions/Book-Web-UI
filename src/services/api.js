import axios from 'axios';

const BASE_URL = 'http://139.59.46.40:8000'; // Replace with your API base URL

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
});

// Interceptor to add the Bearer token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export async function apiRequest(endpoint, method, data = null, formData = null) {
  try {
    const requestData = new FormData();
    if (formData) {
      for (const [key, value] of formData.entries()) {
        requestData.append(key, value);
      }
    }
    const response = await api.request({
      url: `/${endpoint}`,
      method,
      data: requestData

    });
    if (response.status === 401) {
      return null;
    }

    if (response.status >= 400) {
      return response;
    }

    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
