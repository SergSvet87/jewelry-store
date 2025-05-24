/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@/api/axiosInstance';
import { catchErrorCodes } from './errorService';

interface RequestOptions<T = any> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: T;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

export const request = async <TResponse = any, TData = any>(
  options: RequestOptions<TData>
): Promise<TResponse> => {
  try {
    const response = await axiosInstance.request<TResponse>({
      url: options.url,
      method: options.method,
      data: options.data,
      params: options.params,
      headers: options.headers,
    });

    return response.data;
  } catch (error) {
    console.error('HTTP Request Error:', catchErrorCodes(error));
    throw error;
  }
};
