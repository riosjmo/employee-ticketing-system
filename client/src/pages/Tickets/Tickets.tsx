import { useState } from "react"
import { useTickets } from "../../hooks/useTickets"
import { Link } from "react-router-dom"
import { updateTicket } from "../../api/tickets"
import "./tickets.css"

export default function Tickets() {
  const { data, isLoading } = useTickets()
  const [updating, setUpdating] = useState<string | null>(null)

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    setUpdating(ticketId)
    try {
      await updateTicket(ticketId, { status: newStatus as "open" | "in-progress" | "closed" })
    } catch (err) {
      console.error("Failed to update ticket:", err)
    } finally {
      setUpdating(null)
    }
  }

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
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Link className="ticket-link" to={`/tickets/${t.id}`}>{t.title}</Link>
              <select
                value={t.status || "open"}
                onChange={(e) => handleStatusChange(t.id, e.target.value)}
                disabled={updating === t.id}
                style={{ padding: "0.4rem", cursor: updating === t.id ? "wait" : "pointer" }}
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}