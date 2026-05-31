import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { loginUser } from '../services/authService'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setLoading(true)
      setError('')

      const response = await loginUser({
        email,
        password,
      })

      login(response.token, response.fullName)
     navigate('/dashboard')

      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 text-sm text-zinc-400">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-zinc-400">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors p-3 rounded-lg font-semibold"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage