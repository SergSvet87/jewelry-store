import { submitForm } from '@/services/formService';
import { registerSchema } from '@/schemas/authSchema';
import { RegisterRequest, AuthResponse } from '@/types/auth';

export const useRegister = () => {
  const register = async (data: RegisterRequest) => {
    return await submitForm<RegisterRequest, AuthResponse>({
      url: '/auth/register',
      method: 'POST',
      data,
      schema: registerSchema,
    });
  };

  return { register };
};
