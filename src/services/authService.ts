import axios from 'axios';

import { submitForm } from './formService';
import { request } from '@/api/requestService';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { localStorageService } from './localStorageService';
import { ApiEndpoint, HttpMethod, LocalStorage } from '@/enums';
import { RegisterRequest, RegisterResponse, VerifyResponse, VerifyRequest, LoginResponse, LoginRequest } from '@/types/';

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorageService.getItem(LocalStorage.REFRESH_TOKEN_KEY);

  if (!refreshToken) return null;

  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
    refreshToken,
  });

  const newAccessToken = response.data.accessToken;
  return newAccessToken;
};

export const registerUser = async (userData: Partial<RegisterRequest>): Promise<RegisterResponse> => {
  const data = await request<RegisterResponse>({
    url: ApiEndpoint.SIGNUP,
    method: HttpMethod.POST,
    data: userData,
  });

  return data;
};

export const useRegister = () => {
  const register = async (data: RegisterRequest) => {
    return await submitForm<RegisterRequest, RegisterResponse>({
      url: ApiEndpoint.SIGNUP,
      method: HttpMethod.POST,
      data,
    });
  };

  return { register };
};

export const verifyPhoneNumber = async (code: VerifyRequest): Promise<VerifyResponse> => {
  const token = localStorageService.getItem(LocalStorage.ACCESS_TOKEN_KEY)

  const data = await request<VerifyResponse>({
    headers: { Authorization: `Bearer ${token}` },
    url: ApiEndpoint.USER_VERIFY,
    method: HttpMethod.POST,
    data: code,
  });

  return data;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await request<LoginResponse>({
    url: ApiEndpoint.SIGNIN,
    method: HttpMethod.POST,
    data,
  });

  return response;
};

export const handleAuthError = () => {
  const { logout } = useAuthStore.getState();
  logout();
};


