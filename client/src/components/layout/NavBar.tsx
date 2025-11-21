import { Link } from "react-router-dom"

export default function NavBar() {
  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <Link to="/">Dashboard</Link>
      <Link to="/tickets">Tickets</Link>
      <Link to="/employees">Employees</Link>
      <Link to="/login" style={{ marginLeft: "auto" }}>Login</Link>
    </nav>
  )
}