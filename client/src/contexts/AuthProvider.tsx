import React, { useEffect, useState } from "react"
import { AuthContext } from "./auth"
import { loginRequest, registerRequest, logoutRequest } from "../api/auth"
import { api } from "../api/client"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem("accessToken"))
  const [refreshToken, setRefreshToken] = useState<string | null>(() => localStorage.getItem("refreshToken"))

  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
    }
  }, [accessToken])

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
