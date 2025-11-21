import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
import "./login.css"


export default function Login() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		// For demo purposes just navigate to the app
		navigate("/")
	}

	return (
		<form onSubmit={onSubmit} className="page login-page">
			<h1 className="page-title">Login</h1>

			<div className="form-row">
				<label className="form-label">Username</label>
				<Input className="input" value={username} onChange={e => setUsername(e.target.value)} />
			</div>

			<div className="form-row">
				<label className="form-label">Password</label>
				<Input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
			</div>

			<div className="form-actions">
				<Button className="btn primary" type="submit">Login</Button>
			</div>
		</form>
	)
}
