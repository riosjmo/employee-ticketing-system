import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/auth"

export default function RequireAuth({ children }: { children: React.JSX.Element }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}
