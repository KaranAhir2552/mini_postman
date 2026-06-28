import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:4000';

interface ApiResponse<T> {
  data: T;
  status: number;
}

const getToken = () => {
  return localStorage.getItem('token');
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (auto attach token)
api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// GET API
export const getAPI = async <T = any>(endpoint: string): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await api.get(endpoint);

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error('GET API Error:', error);
    throw error;
  }
};

// POST API
export const postAPI = async <T = any>(
  endpoint: string,
  payload: unknown
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await api.post(endpoint, payload);

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error('POST API Error:', error);
    throw error;
  }
};

// PUT API
export const putAPI = async <T = any>(
  endpoint: string,
  payload: unknown
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await api.put(endpoint, payload);

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error('PUT API Error:', error);
    throw error;
  }
};

// DELETE API
export const deleteAPI = async <T = any>(endpoint: string): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await api.delete(endpoint);

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error('DELETE API Error:', error);
    throw error;
  }
};
