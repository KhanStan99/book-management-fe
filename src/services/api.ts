import axios from 'axios';
import type { User, UserCreate, UserUpdate, Book, BookCreate, BookUpdate, Rental, RentalCreate, LoginRequest, LoginResponse } from '../types';
import type { RefreshResponse } from '../types/auth';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to get tokens from localStorage
function getTokens() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return {
    access_token: user?.access_token,
    refresh_token: user?.refresh_token,
  };
}

// Set up axios interceptor for token refresh
let isRefreshing = false;
type FailedQueueItem = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const { access_token } = getTokens();
    if (access_token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;
      const { refresh_token } = getTokens();
      if (!refresh_token) {
        isRefreshing = false;
        return Promise.reject(error);
      }
      try {
        const response = await axios.post(`${API_BASE_URL}/refresh`, { refresh_token });
        const { access_token } = response.data as RefreshResponse;
        // Update localStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.access_token = access_token;
        localStorage.setItem('user', JSON.stringify(user));
        processQueue(null, access_token);
        isRefreshing = false;
        originalRequest.headers['Authorization'] = 'Bearer ' + access_token;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        // Optionally, remove user from localStorage
        localStorage.removeItem('user');
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

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

  // Optionally, expose refresh manually
  refresh: async (refresh_token: string): Promise<RefreshResponse> => {
    const response = await axios.post(`${API_BASE_URL}/refresh`, { refresh_token });
    return response.data;
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
