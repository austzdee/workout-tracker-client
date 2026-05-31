export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  fullName: string
  email: string
  password: string
}

export type AuthResponse = {
  token: string
  email: string
  fullName: string
}