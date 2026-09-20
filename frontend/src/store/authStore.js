import { create } from 'zustand';
import api from '../lib/api';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') || null,
  loading: false,

  setAuth: (user, token) => {
    localStorage.setItem('token', token);
    set({ user, token, isAuthenticated: true });
  },

  login: async (email, password) => {
    set({ loading: true });
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, accessToken } = response.data;
      localStorage.setItem('token', accessToken);
      set({ user, token: accessToken, isAuthenticated: true, loading: false });
      return { success: true };
    } catch (error) {
      set({ loading: false });
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  },

  signup: async (userData) => {
    set({ loading: true });
    try {
      const response = await api.post('/auth/signup', userData);
      const { user, accessToken } = response.data;
      localStorage.setItem('token', accessToken);
      set({ user, token: accessToken, isAuthenticated: true, loading: false });
      return { success: true };
    } catch (error) {
      set({ loading: false });
      return { 
        success: false, 
        message: error.response?.data?.message || 'Signup failed' 
      };
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      set({ user: response.data, isAuthenticated: true });
      return { success: true, data: response.data };
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
      }
      return { success: false, message: error.response?.data?.message || 'Failed to fetch profile' };
    }
  },

  logout: () => {

    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  }
}));

