import { Link } from "react-router-dom"
import { useEmployees } from "../../hooks/useEmployees"

export default function Employees() {
  const { data, isLoading } = useEmployees()

  if (isLoading) return <p>Loading employees...</p>

  return (
    <div>
      <h1>Employees</h1>
      <ul>
        {data?.map(e => (
          <li key={e.id}>
            <Link to={`/employees/${e.id}`}>{e.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
