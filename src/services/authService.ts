import axios from 'axios';

import { localStorageService } from './localStorageService';
import { LocalStorage } from '@/enums';

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorageService.getItem(LocalStorage.REFRESH_TOKEN_KEY);

  if (!refreshToken) return null;

  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
    refreshToken,
  });

  const newAccessToken = response.data.accessToken;
  return newAccessToken;
};



// import { request } from '../api/request';
// import { setAccessToken, setRefreshToken, clearTokens } from '@/utils/localStorageService';

// export const login = async (email: string, password: string) => {
//   const data = await request<{ access_token: string; refresh_token: string }>({
//     url: '/auth/login',
//     method: 'POST',
//     data: { email, password },
//   });
//   setAccessToken(data.access_token);
//   setRefreshToken(data.refresh_token);
// };

// export const logout = () => {
//   clearTokens();
// };
