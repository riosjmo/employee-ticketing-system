import React, { createContext, useContext, useEffect, useState } from "react"
import { loginRequest, registerRequest, logoutRequest } from "../api/auth"
import { api } from "../api/client"

type AuthContextValue = {
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)

  useEffect(() => {
    const a = localStorage.getItem("accessToken")
    const r = localStorage.getItem("refreshToken")
    if (a) {
      setAccessToken(a)
      api.defaults.headers.common["Authorization"] = `Bearer ${a}`
    }
    if (r) setRefreshToken(r)
  }, [])

  const login = async (email: string, password: string) => {
    const data = await loginRequest(email, password)
    setAccessToken(data.accessToken)
    setRefreshToken(data.refreshToken)
    localStorage.setItem("accessToken", data.accessToken)
    localStorage.setItem("refreshToken", data.refreshToken)
    api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`
  }

  const register = async (name: string, email: string, password: string) => {
    await registerRequest(name, email, password)
  }

  const logout = async () => {
    if (refreshToken) await logoutRequest(refreshToken)
    setAccessToken(null)
    setRefreshToken(null)
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    delete api.defaults.headers.common["Authorization"]
  }

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, isAuthenticated: !!accessToken, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
