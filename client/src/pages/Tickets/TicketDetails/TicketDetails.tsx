import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchTicketById, updateTicket } from "../../../api/tickets"
import type { Ticket } from "../../../types/Ticket"
import "./ticketDetails.css"

export default function TicketDetails() {
	const { id } = useParams()
	const [ticket, setTicket] = useState<Ticket | null>(null)
	const [updating, setUpdating] = useState(false)

	useEffect(() => {
		if (!id) return
		fetchTicketById(id).then(setTicket).catch(() => setTicket(null))
	}, [id])

	const handleStatusChange = async (newStatus: string) => {
		if (!ticket) return
		setUpdating(true)
		try {
			const updated = await updateTicket(ticket.id, { status: newStatus as "open" | "in-progress" | "closed" })
			setTicket(updated)
		} catch (err) {
			console.error("Failed to update ticket:", err)
		} finally {
			setUpdating(false)
		}
	}

	if (!ticket) return <p>Loading ticket...</p>

	return (
		<div className="page ticket-details-page">
			<h1 className="ticket-title">{ticket.title}</h1>
			<p className="ticket-desc">{ticket.description}</p>
			<div style={{ marginTop: "1rem" }}>
				<label htmlFor="status-select" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Status</label>
				<select
					id="status-select"
					value={ticket.status || "open"}
					onChange={(e) => handleStatusChange(e.target.value)}
					disabled={updating}
					style={{ padding: "0.5rem", cursor: updating ? "wait" : "pointer" }}
				>
					<option value="open">Open</option>
					<option value="in-progress">In Progress</option>
					<option value="closed">Closed</option>
				</select>
			</div>
			<small className="ticket-meta" style={{ display: "block", marginTop: "1rem" }}>Created: {ticket.createdAt}</small>
		</div>
	)
}
