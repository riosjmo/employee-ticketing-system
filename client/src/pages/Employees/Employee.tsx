import type { Employee } from "../../types/Employee"
import "./employee.css"

export default function EmployeeRow({ employee }: { employee: Employee }) {
	return (
		<div className="employee-row">
			<strong className="employee-name">{employee.name}</strong>
			<div className="employee-email">{employee.email}</div>
		</div>
	)
}
