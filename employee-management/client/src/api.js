const API_URL = 'http://localhost:5000/api'

export async function login(username, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  const data = await res.json()

  // fetch only rejects on network failure. A 401 is a "successful" response,
  // so we must check res.ok ourselves.
  if (!res.ok) throw new Error(data.error || 'Something went wrong')

  return data // { token, user }
}