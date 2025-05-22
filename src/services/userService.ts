import axios from 'axios';

import { request } from '@/api/requestService';
import { ApiEndpoint, HttpMethod } from '@/enums';
import { IUserItem } from '@/types/';

export const getAllUsers = async (): Promise<IUserItem[]> => {
  const data = await request({
    url: ApiEndpoint.USERS,
    method: HttpMethod.GET,
  });

  return data;
};

export const getUserByToken = async (token: string): Promise<IUserItem> => {
  const data = await request({
    headers: { Authorization: `Bearer ${token}` },
    url: ApiEndpoint.USER,
    method: HttpMethod.GET,
  });

  return data;
};

export const updateUser = async (
  data: Partial<IUserItem>,
  token: string
): Promise<IUserItem> => {
  const response = await request({
    headers: { Authorization: `Bearer ${token}` },
    url: ApiEndpoint.USER_UPDATE,
    method: HttpMethod.PUT,
    data: data,
  });

  return response;
};

export const updateUserId = async (
  userId: number,
  data: Partial<IUserItem>,
  token: string
): Promise<IUserItem> => {
  const response = await request({
    headers: { Authorization: `Bearer ${token}` },
    url: `${ApiEndpoint.USER_UPDATE_ID}/${userId}`,
    method: HttpMethod.PUT,
    data: data,
  });
  return response;
};

export const logoutUser = async (refreshToken: string) => {
  const response = await axios.post('/api/auth/logout', { refreshToken });
  return response.data;
};
