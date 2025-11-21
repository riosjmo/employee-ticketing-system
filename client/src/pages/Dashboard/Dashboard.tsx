import { Link } from "react-router-dom"

export default function Dashboard() {
	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome to the Employee Ticketing System demo.</p>
			<nav>
				<ul>
					<li>
						<Link to="/tickets">Tickets</Link>
					</li>
					<li>
						<Link to="/employees">Employees</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}
