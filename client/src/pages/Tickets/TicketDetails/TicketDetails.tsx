import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchTicketById, updateTicket } from "../../../api/tickets"
import type { Ticket } from "../../../types/Ticket"
import "./ticketDetails.css"

export default function TicketDetails() {
	const { id } = useParams()
	const [ticket, setTicket] = useState<Ticket | null>(null)
	const [updating, setUpdating] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [editForm, setEditForm] = useState({ title: "", description: "" })

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

	const startEdit = () => {
		if (ticket) {
			setEditForm({ title: ticket.title, description: ticket.description || "" })
			setIsEditing(true)
		}
	}

	const handleSaveEdit = async () => {
		if (!ticket) return
		setUpdating(true)
		try {
			const updated = await updateTicket(ticket.id, {
				title: editForm.title,
				description: editForm.description,
			})
			setTicket(updated)
			setIsEditing(false)
		} catch (err) {
			console.error("Failed to update ticket:", err)
		} finally {
			setUpdating(false)
		}
	}

	const handleCancelEdit = () => {
		setIsEditing(false)
	}

	if (!ticket) return <p>Loading ticket...</p>

	return (
		<div className="page ticket-details-page">
			{!isEditing ? (
				<>
					<h1 className="ticket-title">{ticket.title}</h1>
					<p className="ticket-desc">{ticket.description}</p>
					<button
						onClick={startEdit}
						style={{
							padding: "0.5rem 1rem",
							marginTop: "1rem",
							marginBottom: "1rem",
							cursor: "pointer",
							backgroundColor: "#4CAF50",
							color: "white",
							border: "none",
							borderRadius: "4px",
						}}
					>
						Edit
					</button>
				</>
			) : (
				<>
					<div style={{ marginBottom: "1rem" }}>
						<label htmlFor="title-input" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
							Title
						</label>
						<input
							id="title-input"
							type="text"
							value={editForm.title}
							onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
							disabled={updating}
							style={{ width: "100%", padding: "0.5rem", boxSizing: "border-box" }}
						/>
					</div>

					<div style={{ marginBottom: "1rem" }}>
						<label htmlFor="desc-input" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
							Description
						</label>
						<textarea
							id="desc-input"
							value={editForm.description}
							onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
							disabled={updating}
							style={{ width: "100%", padding: "0.5rem", boxSizing: "border-box", minHeight: "100px" }}
						/>
					</div>

					<div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
						<button
							onClick={handleSaveEdit}
							disabled={updating}
							style={{
								padding: "0.5rem 1rem",
								cursor: updating ? "wait" : "pointer",
								backgroundColor: "#4CAF50",
								color: "white",
								border: "none",
								borderRadius: "4px",
							}}
						>
							{updating ? "Saving..." : "Save"}
						</button>
						<button
							onClick={handleCancelEdit}
							disabled={updating}
							style={{
								padding: "0.5rem 1rem",
								cursor: updating ? "wait" : "pointer",
								backgroundColor: "#999",
								color: "white",
								border: "none",
								borderRadius: "4px",
							}}
						>
							Cancel
						</button>
					</div>
				</>
			)}

			<div style={{ marginTop: "1rem" }}>
				<label htmlFor="status-select" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
					Status
				</label>
				<select
					id="status-select"
					value={ticket.status || "open"}
					onChange={(e) => handleStatusChange(e.target.value)}
					disabled={updating || isEditing}
					style={{ padding: "0.5rem", cursor: updating || isEditing ? "not-allowed" : "pointer" }}
				>
					<option value="open">Open</option>
					<option value="in-progress">In Progress</option>
					<option value="closed">Closed</option>
				</select>
			</div>

			<small className="ticket-meta" style={{ display: "block", marginTop: "1rem" }}>
				Created: {ticket.createdAt}
			</small>
		</div>
	)
}
