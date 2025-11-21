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
		<div>
			<h1>{ticket.title}</h1>
			<p>{ticket.description}</p>
			<small>Created: {ticket.createdAt}</small>
		</div>
	)
}
