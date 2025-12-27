import { api } from "./client"

export type LoginResponse = {
  accessToken: string
  refreshToken: string
}

export async function loginRequest(email: string, password: string) {
  const res = await api.post<LoginResponse>("/auth/login", { email, password })
  return res.data
}

export async function registerRequest(email: string, password: string) {
  const res = await api.post("/auth/register", { email, password })
  return res.data
}

export async function logoutRequest(refreshToken: string) {
  const res = await api.post("/auth/logout", { refreshToken })
  return res.data
}
