import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
import "./login.css"
import { useAuth } from "../../contexts/auth"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { register } = useAuth()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await register(name, email, password)
      navigate("/login")
    } catch (err: unknown) {
      const typedErr = err as { response?: { data?: { message?: string } } } | Error | null
      let message = "Registration failed"
      if (typedErr && typeof typedErr === "object" && "response" in typedErr && typedErr.response?.data?.message) {
        message = typedErr.response.data.message
      } else if (typedErr instanceof Error) {
        message = typedErr.message
      }
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={onSubmit} className="login-card">
        <h1 className="page-title">Register</h1>

        {error && <div className="form-error">{error}</div>}

        <div className="form-row">
          <label className="form-label">Full name</label>
          <Input className="input" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="form-row">
          <label className="form-label">Email</label>
          <Input className="input" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="form-row">
          <label className="form-label">Password</label>
          <Input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <div className="form-actions">
          <Button className="btn primary" type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</Button>
          <Link to="/login" style={{ marginLeft: "1rem" }}>Back to login</Link>
        </div>
      </form>
    </div>
  )
}
