import { useTickets } from "../../hooks/useTickets"
import { Link } from "react-router-dom"
import "./tickets.css"

export default function Tickets() {
  const { data, isLoading } = useTickets()

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="page tickets-page">
      <div className="page-header">
        <h1 className="page-title">Tickets</h1>
        <Link className="btn primary" to="/tickets/new">Create Ticket</Link>
      </div>

      <ul className="ticket-list">
        {data?.map(t => (
          <li className="ticket-item" key={t.id}>
            <Link className="ticket-link" to={`/tickets/${t.id}`}>{t.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}