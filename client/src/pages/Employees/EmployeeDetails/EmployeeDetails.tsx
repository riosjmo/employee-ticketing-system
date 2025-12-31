import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchEmployeeById } from "../../../api/employee"
import type { Employee } from "../../../types/Employee"
import "./employeeDetails.css"

export default function EmployeeDetails() {
	const { id } = useParams()
	const [employee, setEmployee] = useState<Employee | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!id) return
		setLoading(true)
		setError(null)
		fetchEmployeeById(id)
			.then(e => setEmployee(e))
			.catch((err: any) => {
				if (err?.response?.status === 404) setError("Employee not found")
				else setError("Failed to load employee")
				setEmployee(null)
			})
			.finally(() => setLoading(false))
	}, [id])

	if (loading) return <p>Loading employee...</p>
	if (error) return <p>{error}</p>
	if (!employee) return <p>Employee not found</p>

	return (
		<div className="page employee-details-page">
			<h1 className="employee-name">{employee.name}</h1>
			<p className="employee-email">Email: {employee.email}</p>
			<p className="employee-role">Role: {employee.role}</p>
		</div>
	)
}
