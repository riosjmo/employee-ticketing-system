import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchEmployeeById } from "../../../api/employee"
import type { Employee } from "../../../types/Employee"
import "./employeeDetails.css"

export default function EmployeeDetails() {
	const { id } = useParams()
	const [employee, setEmployee] = useState<Employee | null>(null)

	useEffect(() => {
		if (!id) return
		fetchEmployeeById(id).then(setEmployee).catch(() => setEmployee(null))
	}, [id])

	if (!employee) return <p>Loading employee...</p>

	return (
		<div className="page employee-details-page">
			<h1 className="employee-name">{employee.name}</h1>
			<p className="employee-email">Email: {employee.email}</p>
			<p className="employee-role">Role: {employee.role}</p>
		</div>
	)
}
