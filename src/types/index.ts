// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
  age?: number;
  is_active?: boolean;
}

export interface UserUpdate {
  name?: string;
  email?: string;
  age?: number;
  is_active?: boolean;
}

// Book Types
export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  description?: string;
  category?: string;
  total_copies: number;
  available_copies: number;
  price: number;
  publication_year?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BookCreate {
  title: string;
  author: string;
  isbn: string;
  description?: string;
  category?: string;
  total_copies?: number;
  available_copies?: number;
  price: number;
  publication_year?: number;
  is_active?: boolean;
}

export interface BookUpdate {
  title?: string;
  author?: string;
  isbn?: string;
  description?: string;
  category?: string;
  total_copies?: number;
  available_copies?: number;
  price?: number;
  publication_year?: number;
  is_active?: boolean;
}

// Rental Types
export interface Rental {
  id: number;
  user_id: number;
  book_id: number;
  rental_date: string;
  due_date: string;
  return_date?: string;
  daily_rate: number;
  total_amount?: number;
  is_returned: boolean;
  late_fee: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RentalCreate {
  user_id: number;
  book_id: number;
  due_date: string;
  daily_rate: number;
}

export interface RentalWithBook extends Rental {
  book: Book;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
  };
}
