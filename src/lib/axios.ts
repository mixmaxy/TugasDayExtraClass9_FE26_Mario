/**
 * Axios instance configuration dengan default base URL, headers, dan error handling
 * Digunakan untuk semua HTTP requests di aplikasi (GET, POST, PUT, DELETE)
 *
 * Features:
 * - Centralized configuration
 * - Automatic base URL setup
 * - Request/Response interceptors untuk error handling
 * - Type-safe dengan TypeScript
 */

import axios, { AxiosInstance, AxiosError } from "axios";


/**
 * Type untuk API response yang konsisten
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Type untuk error yang ditangani oleh interceptor
 */
export interface ApiErrorResponse {
  success: false;
  error: string;
  status?: number;
}

/**
 * Create Axios instance dengan konfigurasi default
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    // Base URL dari environment variable
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",

    // Default headers
    headers: {
      "Content-Type": "application/json",
    },

    // Request timeout: 30 detik
    timeout: 30000,
  });

  /**
   * Request interceptor: Tambahkan auth token jika ada (opsional untuk future use)
   * Bisa digunakan untuk: authentication header, request logging, dll
   */
  instance.interceptors.request.use(
    (config) => {
      // Contoh: tambahkan auth token dari localStorage/sessionStorage
      // const token = localStorage.getItem('authToken');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }

      return config;
    },
    (error) => {
      // Log error request
      console.error("[Axios Request Error]", error);
      return Promise.reject(error);
    },
  );

  /**
   * Response interceptor: Handle error responses secara global
   * Validasi response format dan throw error jika ada masalah
   */
  instance.interceptors.response.use(
    (response) => {
      // Response berhasil (2xx) - return AxiosResponse as-is
      return response;
    },
    (error: AxiosError) => {
      // Handle different error scenarios
      const errorMessage = getErrorMessage(error);

      console.error("[Axios Response Error]", {
        status: error.response?.status,
        message: errorMessage,
        data: error.response?.data,
      });

      // Lempar error dengan format yang konsisten
      const apiError: ApiErrorResponse = {
        success: false,
        error: errorMessage,
        status: error.response?.status,
      };

      return Promise.reject(apiError);
    },
  );

  return instance;
};

/**
 * Helper function untuk ekstrak error message dari berbagai sumber
 */
function getErrorMessage(error: AxiosError): string {
  // Jika ada response data dengan error message
  if (error.response?.data && typeof error.response.data === "object") {
    const data = error.response.data as any;
    if (data.error) return data.error;
    if (data.message) return data.message;
  }

  // Jika ada status code, gunakan default message
  if (error.response?.status) {
    const statusMessages: Record<number, string> = {
      400: "Request tidak valid. Periksa kembali data yang dikirim.",
      401: "Anda tidak terautentikasi. Silakan login kembali.",
      403: "Anda tidak memiliki akses ke resource ini.",
      404: "Resource tidak ditemukan.",
      500: "Terjadi kesalahan di server. Silakan coba lagi.",
    };
    return (
      statusMessages[error.response.status] ||
      "Terjadi kesalahan tidak terduga."
    );
  }

  // Jika timeout
  if (error.code === "ECONNABORTED") {
    return "Request timeout. Koneksi internet Anda mungkin lambat.";
  }

  // Default message
  return error.message || "Terjadi kesalahan tidak terduga.";
}

/**
 * Export Axios instance sebagai singleton
 * Hanya ada 1 instance di seluruh aplikasi
 */
export const apiClient: AxiosInstance = createAxiosInstance();

/**
 * Export individual methods untuk convenience
 * Contoh: api.get('/foods'), api.post('/foods', data), dll
 *
 * Usage:
 * const response = await api.get<Food>('/api/foods');
 * // response.data contains your ApiResponse<Food>
 */
export const api = {
  get: <T = unknown>(url: string, config?: any) =>
    apiClient.get<ApiResponse<T>>(url, config),

  post: <T = unknown>(url: string, data?: any, config?: any) =>
    apiClient.post<ApiResponse<T>>(url, data, config),

  put: <T = unknown>(url: string, data?: any, config?: any) =>
    apiClient.put<ApiResponse<T>>(url, data, config),

  patch: <T = unknown>(url: string, data?: any, config?: any) =>
    apiClient.patch<ApiResponse<T>>(url, data, config),

  delete: <T = unknown>(url: string, config?: any) =>
    apiClient.delete<ApiResponse<T>>(url, config),
};

export default apiClient;
