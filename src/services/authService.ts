import axios from 'axios';

import { submitForm } from '../api/formService';
import { request } from '@/api/requestService';
import { useAuthStore } from '@/store/useAuthStore';
import { localStorageService } from '../api/localStorageService';
import { ApiEndpoint, HttpMethod, LocalStorage } from '@/enums';
import { RegisterRequest, RegisterResponse, VerifyResponse, VerifyRequest, LoginResponse, LoginRequest } from '@/types/';

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorageService.getItem(LocalStorage.REFRESH_TOKEN_KEY);

  if (!refreshToken) return null;

  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
    refreshToken,
  });

  const newAccessToken = response.data.accessToken;
  return newAccessToken;
};

const registerUser = async (userData: Partial<RegisterRequest>): Promise<RegisterResponse> => {
  const data = await request<RegisterResponse>({
    url: ApiEndpoint.SIGNUP,
    method: HttpMethod.POST,
    data: userData,
  });

  return data;
};

const useRegister = () => {
  const register = async (data: RegisterRequest) => {
    return await submitForm<RegisterRequest, RegisterResponse>({
      url: ApiEndpoint.SIGNUP,
      method: HttpMethod.POST,
      data,
    });
  };

  return { register };
};

const verifyPhoneNumber = async (code: VerifyRequest): Promise<VerifyResponse> => {
  const token = localStorageService.getItem(LocalStorage.ACCESS_TOKEN_KEY)

  const data = await request<VerifyResponse>({
    headers: { Authorization: `Bearer ${token}` },
    url: ApiEndpoint.USER_VERIFY,
    method: HttpMethod.POST,
    data: code,
  });

  return data;
};

const verifyPhoneLogin = async (code: VerifyRequest): Promise<VerifyResponse> => {
  const token = localStorageService.getItem(LocalStorage.ACCESS_TOKEN_KEY)

  const data = await request<VerifyResponse>({
    headers: { Authorization: `Bearer ${token}` },
    url: ApiEndpoint.USER_VERIFY_LOGIN,
    method: HttpMethod.POST,
    data: code,
  });

  return data;
};

const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await request<LoginResponse>({
    url: ApiEndpoint.SIGNIN,
    method: HttpMethod.POST,
    data,
  });

  return response;
};

const handleAuthError = () => {
  const { logout } = useAuthStore.getState();
  logout();
};

export {
  handleAuthError, 
  login, 
  verifyPhoneLogin, 
  verifyPhoneNumber, 
  useRegister, 
  refreshAccessToken,
  registerUser
}


