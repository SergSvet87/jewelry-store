export interface RegisterRequest {
  name: string;
  phone: string;
}

export interface LoginRequest {
  phone: string;
}

export interface UpdateProfileRequest {
  name: string;
  phone?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}
