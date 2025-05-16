import { submitForm } from '@/services/formService';
import { updateProfileSchema } from '@/schemas/authSchema';
import { UpdateProfileRequest, AuthResponse } from '@/types/auth';

export const useUpdateProfile = () => {
  const updateProfile = async (data: UpdateProfileRequest) => {
    return await submitForm<UpdateProfileRequest, AuthResponse>({
      url: '/auth/profile',
      method: 'PUT',
      data,
      schema: updateProfileSchema,
    });
  };

  return { updateProfile };
};
