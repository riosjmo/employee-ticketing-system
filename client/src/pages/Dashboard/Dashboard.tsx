import { Link } from "react-router-dom"
import "./dashboard.css"

export default function Dashboard() {
	return (
		<div className="page dashboard-page">
			<h1 className="page-title">Dashboard</h1>
			<p className="lead">Welcome to the Employee Ticketing System demo.</p>

			<nav className="dashboard-nav">
				<ul className="nav-list">
					<li>
						<Link className="nav-link" to="/tickets">Tickets</Link>
					</li>
					<li>
						<Link className="nav-link" to="/employees">Employees</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}
