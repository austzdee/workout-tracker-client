import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await registerUser({
        fullName,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl"
      >
        <h1 className="text-3xl font-bold mb-2">Create Account</h1>

        <p className="text-zinc-400 mb-6">
          Register to start tracking your workouts.
        </p>

        {error && (
          <p className="bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg p-3 mb-4">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-lg px-4 py-3 font-semibold transition"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </div>

        <p className="text-zinc-400 text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}

export default RegisterPage;