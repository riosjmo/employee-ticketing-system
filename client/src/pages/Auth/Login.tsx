import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"

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
		<form onSubmit={onSubmit} style={{ maxWidth: 400 }}>
			<h1>Login</h1>
			<div>
				<label>Username</label>
				<Input value={username} onChange={e => setUsername(e.target.value)} />
			</div>
			<div>
				<label>Password</label>
				<Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
			</div>
			<Button type="submit">Login</Button>
		</form>
	)
}
