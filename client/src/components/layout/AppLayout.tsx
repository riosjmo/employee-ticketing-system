import { Outlet } from "react-router-dom"
import NavBar from "./NavBar/NavBar"

export default function AppLayout() {
  return (
    <div className="app">
      <NavBar />
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  )
}