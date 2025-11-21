import { useTickets } from "../../hooks/useTickets"
import { Link } from "react-router-dom"

export default function Tickets() {
  const { data, isLoading } = useTickets()

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <h1>Tickets</h1>
      <Link to="/tickets/new">Create Ticket</Link>

      <ul>
        {data?.map(t => (
          <li key={t.id}>
            <Link to={`/tickets/${t.id}`}>{t.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}