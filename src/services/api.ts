import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, UserCreate, UserUpdate, Book, BookCreate, BookUpdate, Rental, RentalCreate, LoginRequest, LoginResponse } from '../types';
import type { RefreshResponse } from '../types/auth';

const API_BASE_URL = 'http://localhost:8000';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const rawBaseQuery = fetchBaseQuery({
      baseUrl: API_BASE_URL,
      prepareHeaders: (headers) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user?.access_token) {
          headers.set('Authorization', `Bearer ${user.access_token}`);
        }
        return headers;
      },
    });
    const result = await rawBaseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return result;
  },
  endpoints: (builder) => ({
    // User endpoints
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation<User, UserCreate>({
      query: (user) => ({
        url: '/users/',
        method: 'POST',
        body: user,
      }),
    }),
    updateUser: builder.mutation<User, { id: number; user: UserUpdate }>({
      query: ({ id, user }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: user,
      }),
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
    // Book endpoints
    getBooks: builder.query<Book[], { skip?: number; limit?: number }>({
      query: ({ skip = 0, limit = 100 } = {}) => `/books/?skip=${skip}&limit=${limit}`,
    }),
    getBook: builder.query<Book, number>({
      query: (id) => `/books/${id}`,
    }),
    createBook: builder.mutation<Book, BookCreate>({
      query: (book) => ({
        url: '/books/',
        method: 'POST',
        body: book,
      }),
    }),
    updateBook: builder.mutation<Book, { id: number; book: BookUpdate }>({
      query: ({ id, book }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: book,
      }),
    }),
    deleteBook: builder.mutation<void, number>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
    }),
    // Rental endpoints
    getRentals: builder.query<Rental[], { skip?: number; limit?: number }>({
      query: ({ skip = 0, limit = 100 } = {}) => `/rentals/?skip=${skip}&limit=${limit}`,
    }),
    getRental: builder.query<Rental, number>({
      query: (id) => `/rentals/${id}`,
    }),
    getUserRentals: builder.query<Rental[], { userId: number; skip?: number; limit?: number }>({
      query: ({ userId, skip = 0, limit = 100 }) => `/users/${userId}/rentals?skip=${skip}&limit=${limit}`,
    }),
    createRental: builder.mutation<Rental, RentalCreate>({
      query: (rental) => ({
        url: '/rentals/',
        method: 'POST',
        body: rental,
      }),
    }),
    returnBook: builder.mutation<Rental, number>({
      query: (rentalId) => ({
        url: `/rentals/${rentalId}/return`,
        method: 'PUT',
      }),
    }),
    getOverdueRentals: builder.query<Rental[], void>({
      query: () => '/rentals/overdue',
    }),
    // Auth endpoints
    getCurrentUser: builder.query<User, void>({
      query: () => '/me',
    }),
    refresh: builder.mutation<RefreshResponse, string>({
      query: (refresh_token) => ({
        url: '/refresh',
        method: 'POST',
        body: { refresh_token },
      }),
    }),
    // Health check
    healthCheck: builder.query<{ message: string }, void>({
      query: () => '/',
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetRentalsQuery,
  useGetRentalQuery,
  useGetUserRentalsQuery,
  useCreateRentalMutation,
  useReturnBookMutation,
  useGetOverdueRentalsQuery,
  useGetCurrentUserQuery,
  useRefreshMutation,
  useHealthCheckQuery,
} = api;
