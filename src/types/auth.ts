interface RegisterRequest {
  name: string;
  phone: string;
}
interface RegisterResponse {
  token: string;
}

interface VerifyRequest {
  code: string;
}

interface VerifyResponse {
  access_token: string;
  refresh_token: string;
}

interface LoginRequest {
  phone: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

interface UpdateProfileRequest {
  name: string;
  phone?: string;
}

export type {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
  RegisterResponse,
  VerifyResponse,
  VerifyRequest,
  UpdateProfileRequest,
}
