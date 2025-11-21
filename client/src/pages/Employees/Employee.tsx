import React from "react"
import type { Employee } from "../../types/Employee"

export default function EmployeeRow({ employee }: { employee: Employee }) {
	return (
		<div>
			<strong>{employee.name}</strong>
			<div>{employee.email}</div>
		</div>
	)
}
