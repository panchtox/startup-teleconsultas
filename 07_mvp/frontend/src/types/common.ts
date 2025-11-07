/**
 * Common types used across the application
 */

export type Status = 'active' | 'inactive' | 'pending' | 'archived';

export interface DateRange {
  start: Date;
  end: Date;
}

export interface TimeRange {
  start: string; // HH:mm format
  end: string;
}

export interface Address {
  street: string;
  number: string;
  floor?: string;
  apartment?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  alternativePhone?: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  total: number;
}

export interface SortParams {
  field: string;
  order: 'asc' | 'desc';
}

export interface FilterParams {
  [key: string]: string | number | boolean | undefined;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
