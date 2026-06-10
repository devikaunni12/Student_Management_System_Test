import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Navbar from '../components/Navbar'

export default function Login() {
  const navigate = useNavigate()

  // Username/password state.
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // UI states.
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const canSubmit = username.trim().length > 0 && password.length > 0 && !loading

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return

    setLoading(true)
    setError('')

    try {
      // DRF login endpoint returns { token: "..." }
      const res = await api.post('/api/login', { username, password })
      const token = res.data.token
      localStorage.setItem('token', token)

      navigate('/dashboard')
    } catch (err) {
      const detail = err?.response?.data?.detail || 'Login failed'
      setError(detail)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth">
      <Navbar />

      <div className="auth__center">
        <div className="auth__card">
          <div className="auth__icon">🔐</div>

          <h1 className="auth__title">Welcome Back</h1>
          <p className="auth__subtitle">Please enter your details</p>

          {error ? <div className="alert alert--error">{error}</div> : null}

          <form className="auth__form" onSubmit={onSubmit}>
            <label className="field" style={{ display: 'block' }}>
              <span className="field__label">Username</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="field__input"
                placeholder="admin"
                disabled={loading}
                autoComplete="username"
              />
            </label>

            <label className="field" style={{ display: 'block' }}>
              <span className="field__label">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field__input"
                placeholder="admin123"
                disabled={loading}
                autoComplete="current-password"
              />
            </label>

            <button className="btn btn--gold" type="submit" disabled={!canSubmit}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>
        </div>
</div>
    </div>
  )
}
