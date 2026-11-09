import { useState } from 'react'
import { login } from '../api'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault() // stop the browser's full-page form submit
    setError('')
    setLoading(true)

    try {
      const data = await login(username, password)
      onLogin(data) // hand { token, user } up to the parent
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Sign in</h2>

      {error && <p className="error">{error}</p>}

      <label htmlFor="username">Username</label>
      <input
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />

      <button type="submit" disabled={loading || !username || !password}>
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}

export default Login