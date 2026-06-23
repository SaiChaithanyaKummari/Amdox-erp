import { create } from 'zustand';
import api from '../lib/api.js';

const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },
  setToken: (token) => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    set({ token, isAuthenticated: !!token });
  },
  login: async (credentials) => {
    // 1. Check default admin credentials
    if (credentials.email === 'admin@amdoxerp.com' && 
        credentials.password === 'enterprise') {
      const mockUser = { id: 'u-1', name: 'Nadia Wilson', role: 'admin', email: 'admin@amdoxerp.com' };
      const mockToken = 'mock-token-' + Date.now();
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      set({ user: mockUser, token: mockToken, isAuthenticated: true });
      return { data: { token: mockToken, user: mockUser } };
    }

    // 2. Check locally registered users list from localStorage
    const localUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const matchingUser = localUsers.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (matchingUser) {
      const mockUser = { 
        id: matchingUser.id || 'u-' + Date.now(), 
        name: matchingUser.name, 
        role: matchingUser.role, 
        email: matchingUser.email 
      };
      const mockToken = 'mock-token-' + Date.now();
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      set({ user: mockUser, token: mockToken, isAuthenticated: true });
      return { data: { token: mockToken, user: mockUser } };
    }

    // 3. Fallback to API if available
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data && response.data.token) {
        const token = response.data.token;
        const user = response.data.user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ user, token, isAuthenticated: true });
        return response;
      }
    } catch (e) {
      // Ignore and throw invalid credentials
    }

    throw new Error('Invalid credentials');
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
