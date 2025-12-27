import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function NavBar() {
  const { isAuthenticated, logout } = useAuth()
  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <Link to="/">Dashboard</Link>
      <Link to="/tickets">Tickets</Link>
      <Link to="/employees">Employees</Link>
      {!isAuthenticated ? (
        <>
          <Link to="/login" style={{ marginLeft: "auto" }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={() => logout()} style={{ marginLeft: "auto" }}>Logout</button>
      )}
    </nav>
  )
}