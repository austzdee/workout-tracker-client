import api from '../api/axios'
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth'

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/Auth/login', data)
  return response.data
}

export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/Auth/register', data)
  return response.data
}