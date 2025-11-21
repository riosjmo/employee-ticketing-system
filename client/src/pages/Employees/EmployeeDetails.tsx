import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchEmployeeById } from "../../api/employee"
import type { Employee } from "../../types/Employee"

export default function EmployeeDetails() {
	const { id } = useParams()
	const [employee, setEmployee] = useState<Employee | null>(null)

	useEffect(() => {
		if (!id) return
		fetchEmployeeById(id).then(setEmployee).catch(() => setEmployee(null))
	}, [id])

	if (!employee) return <p>Loading employee...</p>

	return (
		<div>
			<h1>{employee.name}</h1>
			<p>Email: {employee.email}</p>
			<p>Role: {employee.role}</p>
		</div>
	)
}
