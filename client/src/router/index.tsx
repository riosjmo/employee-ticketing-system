import { createBrowserRouter } from "react-router-dom"
import AppLayout from "../components/layout/AppLayout"
import Dashboard from "../pages/Dashboard/Dashboard"
import Tickets from "../pages/Tickets/Tickets"
import TicketDetails from "../pages/Tickets/TicketDetails"
import CreateTicket from "../pages/Tickets/CreateTicket"
import Employees from "../pages/Employees/Employees"
import EmployeeDetails from "../pages/Employees/EmployeeDetails"
import Login from "../pages/Auth/Login"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/tickets", element: <Tickets /> },
      { path: "/tickets/new", element: <CreateTicket /> },
      { path: "/tickets/:id", element: <TicketDetails /> },
      { path: "/employees", element: <Employees /> },
      { path: "/employees/:id", element: <EmployeeDetails /> },
    ],
  },
  { path: "/login", element: <Login /> },
])

export default router