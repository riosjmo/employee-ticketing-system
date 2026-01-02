import { useState } from "react"
import { useTickets } from "../../hooks/useTickets"
import { Link } from "react-router-dom"
import { updateTicket, deleteTicket } from "../../api/tickets"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import "./tickets.css"

export default function Tickets() {
  const { data, isLoading } = useTickets()
  const [updating, setUpdating] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTicket(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] }),
  })

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

  const handleDelete = async (ticketId: string) => {
    const ok = window.confirm("Delete this ticket? This action cannot be undone.")
    if (!ok) return
    try {
      await deleteMutation.mutateAsync(ticketId)
    } catch (err) {
      console.error("Failed to delete ticket:", err)
    }
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="page tickets-page">
      <div className="page-header">
        <h1 className="page-title">Tickets</h1>
        <Link className="page-subtitle" to="/tickets/new">Create Ticket</Link>
      </div>

      <ul className="ticket-list">
        {data?.map(t => (
          <li className="ticket-item" key={t.id}>
            <div className="ticket-row">
              <Link className="ticket-link" to={`/tickets/${t.id}`}>{t.title}</Link>
              <select
                className="ticket-select"
                value={t.status || "open"}
                onChange={(e) => handleStatusChange(t.id, e.target.value)}
                disabled={updating === t.id}
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              <button
                className="ticket-delete-btn"
                onClick={() => handleDelete(t.id)}
                disabled={deleteMutation.status === "pending"}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}