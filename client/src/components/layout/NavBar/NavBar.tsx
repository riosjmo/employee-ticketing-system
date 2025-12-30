import { Link } from "react-router-dom"
import { useAuth } from "../../../contexts/auth"
import "./NavBar.css"

export default function NavBar() {
  const { isAuthenticated, logout } = useAuth()
  return (
    <nav className="nav-bar">
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/tickets">Tickets</Link>
        <Link to="/employees">Employees</Link>
      </div>
      {!isAuthenticated ? (
        <div className="nav-auth">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <button onClick={() => logout()} className="logout-button">Logout</button>
      )}
    </nav>
  )
}