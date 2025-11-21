import { useState } from "react"
import { createTicket } from "../../api/tickets"
import { useNavigate } from "react-router-dom"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"

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
		<form onSubmit={onSubmit}>
			<h1>Create Ticket</h1>
			<div>
				<label>Title</label>
				<Input value={title} onChange={e => setTitle(e.target.value)} />
			</div>
			<div>
				<label>Description</label>
				<textarea value={description} onChange={e => setDescription(e.target.value)} />
			</div>
			<Button type="submit">Create</Button>
		</form>
	)
}
