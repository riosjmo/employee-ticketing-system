import { Link } from "react-router-dom"
import { useEmployees } from "../../hooks/useEmployees"
import "./employees.css"

export default function Employees() {
  const { data, isLoading } = useEmployees()

  if (isLoading) return <p>Loading employees...</p>

  return (
    <div className="page employees-page">
      <div className="page-header">
        <h1 className="page-title">Employees</h1>
      </div>

      <ul className="employee-list">
        {data?.map(e => (
          <li className="employee-item" key={e.id}>
            <Link className="employee-link" to={`/employees/${e.id}`}>{e.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
