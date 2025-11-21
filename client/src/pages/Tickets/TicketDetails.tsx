import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchTicketById } from "../../api/tickets"
import type { Ticket } from "../../types/Ticket"

export default function TicketDetails() {
	const { id } = useParams()
	const [ticket, setTicket] = useState<Ticket | null>(null)

	useEffect(() => {
		if (!id) return
		fetchTicketById(id).then(setTicket).catch(() => setTicket(null))
	}, [id])

	if (!ticket) return <p>Loading ticket...</p>

	return (
		<div className="page ticket-details-page">
			<h1 className="ticket-title">{ticket.title}</h1>
			<p className="ticket-desc">{ticket.description}</p>
			<small className="ticket-meta">Created: {ticket.createdAt}</small>
		</div>
	)
}
