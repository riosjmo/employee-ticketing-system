import { useState } from "react"
import { createTicket } from "../../../api/tickets"
import { useNavigate } from "react-router-dom"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"
import "./createTicket.css"

export default function CreateTicket() {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const navigate = useNavigate()

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		try {
			await createTicket({ title, description })
			navigate("/tickets")
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<form onSubmit={onSubmit} className="page create-ticket-page form">
			<h1 className="page-title">Create Ticket</h1>

			<div className="form-row">
				<label className="form-label">Title</label>
				<Input className="input" value={title} onChange={e => setTitle(e.target.value)} />
			</div>

			<div className="form-row">
				<label className="form-label">Description</label>
				<textarea className="textarea" value={description} onChange={e => setDescription(e.target.value)} />
			</div>

			<div className="form-actions">
				<Button className="btn primary" type="submit">Create</Button>
			</div>
		</form>
	)
}
