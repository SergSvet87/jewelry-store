interface RegisterRequest {
  name: string;
  email: string;
}
interface RegisterResponse {
  token: string;
}

interface VerifyRequest {
  code: string;
}

interface VerifyResponse {
  token: string;
  // refresh_token: string;
}

interface LoginRequest {
  email: string;
}

interface LoginResponse {
  token: string;
  // refresh_token: string;
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
