import axios from 'axios';
import type { User, UserCreate, UserUpdate, Book, BookCreate, BookUpdate, Rental, RentalCreate, LoginRequest, LoginResponse } from '../types';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API
export const userApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/login', credentials);
    return response.data;
  },

  signUp: async (user: UserCreate): Promise<User> => {
    const response = await api.post('/users/', user);
    return response.data;
  },

  updateUser: async (id: number, user: UserUpdate): Promise<User> => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

// Book API
export const bookApi = {
  getBooks: async (skip = 0, limit = 100): Promise<Book[]> => {
    const response = await api.get(`/books/?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  getBook: async (id: number): Promise<Book> => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  createBook: async (book: BookCreate): Promise<Book> => {
    const response = await api.post('/books/', book);
    return response.data;
  },

  updateBook: async (id: number, book: BookUpdate): Promise<Book> => {
    const response = await api.put(`/books/${id}`, book);
    return response.data;
  },

  deleteBook: async (id: number): Promise<void> => {
    await api.delete(`/books/${id}`);
  },
};

// Rental API
export const rentalApi = {
  getRentals: async (skip = 0, limit = 100): Promise<Rental[]> => {
    const response = await api.get(`/rentals/?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  getRental: async (id: number): Promise<Rental> => {
    const response = await api.get(`/rentals/${id}`);
    return response.data;
  },

  getUserRentals: async (userId: number, skip = 0, limit = 100): Promise<Rental[]> => {
    const response = await api.get(`/users/${userId}/rentals?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  createRental: async (rental: RentalCreate): Promise<Rental> => {
    const response = await api.post('/rentals/', rental);
    return response.data;
  },

  returnBook: async (rentalId: number): Promise<Rental> => {
    const response = await api.put(`/rentals/${rentalId}/return`);
    return response.data;
  },

  getOverdueRentals: async (): Promise<Rental[]> => {
    const response = await api.get('/rentals/overdue');
    return response.data;
  },
};

// Authentication API
export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/login', credentials);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/me');
    return response.data;
  },

  setAuthToken: (token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  removeAuthToken: () => {
    delete api.defaults.headers.common['Authorization'];
  },
};

// Health check
export const healthApi = {
  check: async (): Promise<{ message: string }> => {
    const response = await api.get('/');
    return response.data;
  },
};

export default api;
