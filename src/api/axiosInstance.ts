import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

import { ContentType, LocalStorage } from '@/enums';
import { refreshAccessToken } from '@/services/authService';
import { localStorageService } from '@/api/localStorageService';
import { useAuthStore } from '@/store/useAuthStore';


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    Accept: ContentType.JSON,
    'ngrok-skip-browser-warning': 'true',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorageService.getItem(LocalStorage.ACCESS_TOKEN_KEY);

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const { logout } = useAuthStore();
    
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (
      error.response?.status === 401 &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          localStorageService.setItem(LocalStorage.ACCESS_TOKEN_KEY, newAccessToken);
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);

        logout();
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
