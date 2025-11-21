import type { Employee } from "../../types/Employee"
import "./employee.css"

export default function EmployeeRow({ employee }: { employee: Employee }) {
	return (
		<div>
			<strong>{employee.name}</strong>
			<div>{employee.email}</div>
		</div>
	)
}
