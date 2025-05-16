import { submitForm } from '@/services/formService';
import { loginSchema } from '@/schemas/authSchema';
import { LoginRequest, AuthResponse } from '@/types/auth';

export const useLogin = () => {
  const login = async (data: LoginRequest) => {
    return await submitForm<LoginRequest, AuthResponse>({
      url: '/auth/login',
      method: 'POST',
      data,
      schema: loginSchema,
    });
  };

  return { login };
};
