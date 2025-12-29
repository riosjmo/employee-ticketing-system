import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/auth"

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}
