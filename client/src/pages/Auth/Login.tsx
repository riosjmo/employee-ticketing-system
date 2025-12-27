import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
import "./login.css"
import { useAuth } from "../../contexts/AuthContext"

export default function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { login } = useAuth()

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setLoading(true)
		try {
			await login(email, password)
			navigate("/")
		} catch (err: any) {
			setError(err?.response?.data?.message || err?.message || "Login failed")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="login-container">
			<form onSubmit={onSubmit} className="login-card">
				<h1 className="page-title">Login</h1>

				{error && <div className="form-error">{error}</div>}

				<div className="form-row">
					<label className="form-label">Email</label>
					<Input className="input" value={email} onChange={e => setEmail(e.target.value)} />
				</div>

				<div className="form-row">
					<label className="form-label">Password</label>
					<Input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
				</div>

				<div className="form-actions">
					<Button className="btn primary" type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
					<Link to="/register" style={{ marginLeft: "1rem" }}>Register</Link>
				</div>
			</form>
		</div>
	)
}
