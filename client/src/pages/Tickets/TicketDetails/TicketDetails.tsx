import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchTicketById, updateTicket, deleteTicket } from "../../../api/tickets"
import type { Ticket } from "../../../types/Ticket"
import { useMutation, useQueryClient } from "@tanstack/react-query"
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

	const queryClient = useQueryClient()
	const deleteMutation = useMutation({
		mutationFn: (id: string) => deleteTicket(id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] }),
	})

	const navigate = useNavigate()

	const handleDelete = async () => {
		if (!ticket) return
		const ok = window.confirm("Delete this ticket? This action cannot be undone.")
		if (!ok) return
		try {
			await deleteMutation.mutateAsync(ticket.id)
			navigate("/tickets")
		} catch (err) {
			console.error("Failed to delete ticket:", err)
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
						className="edit-btn"
					>
						Edit
					</button>
					<button
						onClick={handleDelete}
						className="delete-btn"
						disabled={deleteMutation.status === "pending"}
						style={{ marginLeft: "0.5rem" }}
					>
						{deleteMutation.status === "pending" ? "Deleting..." : "Delete"}
					</button>
				</>
			) : (
				<>
					<div className="form-group">
						<label htmlFor="title-input">Title</label>
						<input
							id="title-input"
							type="text"
							value={editForm.title}
							onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
							disabled={updating}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="desc-input">Description</label>
						<textarea
							id="desc-input"
							value={editForm.description}
							onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
							disabled={updating}
						/>
					</div>

					<div className="button-group">
						<button
							onClick={handleSaveEdit}
							disabled={updating}
							className="btn-save"
						>
							{updating ? "Saving..." : "Save"}
						</button>
						<button
							onClick={handleCancelEdit}
							disabled={updating}
							className="btn-cancel"
						>
							Cancel
						</button>
					</div>
				</>
			)}

			<div className="status-group">
				<label htmlFor="status-select">Status</label>
				<select
					id="status-select"
					value={ticket.status || "open"}
					onChange={(e) => handleStatusChange(e.target.value)}
					disabled={updating || isEditing}
				>
					<option value="open">Open</option>
					<option value="in-progress">In Progress</option>
					<option value="closed">Closed</option>
				</select>
			</div>

			<small className="ticket-meta">Created: {ticket.createdAt}</small>
		</div>
	)
}
