import { api } from "./client"
import type { Employee } from "../types/Employee"

export async function fetchEmployees() {
	const res = await api.get<Employee[]>("/employees")
	return res.data
}

export async function fetchEmployeeById(id: string) {
	const res = await api.get<Employee>(`/employees/${id}`)
	return res.data
}
