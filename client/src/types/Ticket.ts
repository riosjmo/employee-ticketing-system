export interface Ticket {
	id: string
	title: string
	description?: string
	status?: "open" | "in-progress" | "closed"
	createdAt?: string
	assignedTo?: string
}
