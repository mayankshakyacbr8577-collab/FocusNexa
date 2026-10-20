import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('focusnexa_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('focusnexa_token');
      localStorage.removeItem('focusnexa_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Functions
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  logout: async () => {
    localStorage.removeItem('focusnexa_token');
    localStorage.removeItem('focusnexa_user');
    return { success: true };
  },
};

export const sessionAPI = {
  getAll: async () => {
    const response = await api.get('/sessions');
    return response.data;
  },

  create: async (sessionData) => {
    const response = await api.post('/sessions', sessionData);
    return response.data;
  },

  update: async (id, sessionData) => {
    const response = await api.put(`/sessions/${id}`, sessionData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/sessions/${id}`);
    return response.data;
  },
};

export const topicAPI = {
  getAll: async () => {
    const response = await api.get('/topics');
    return response.data;
  },

  create: async (topicData) => {
    const response = await api.post('/topics', topicData);
    return response.data;
  },

  update: async (id, topicData) => {
    const response = await api.put(`/topics/${id}`, topicData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/topics/${id}`);
    return response.data;
  },
};

export const goalAPI = {
  getAll: async () => {
    const response = await api.get('/goals');
    return response.data;
  },

  create: async (goalData) => {
    const response = await api.post('/goals', goalData);
    return response.data;
  },

  update: async (id, goalData) => {
    const response = await api.put(`/goals/${id}`, goalData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/goals/${id}`);
    return response.data;
  },
};

export const analyticsAPI = {
  get: async () => {
    const response = await api.get('/analytics');
    return response.data;
  },
};

export const weeklyReportAPI = {
  get: async () => {
    const response = await api.get('/weekly-report');
    return response.data;
  },
};

export const aiAPI = {
  getInsights: async () => {
    const response = await api.get('/ai/insights');
    return response.data;
  },

  generateStudyPlan: async (goal) => {
    const response = await api.post('/ai/study-plan', { goal });
    return response.data;
  },
};

export const userAPI = {
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },
};
