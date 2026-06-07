import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await loginUser({
        email,
        password,
      });

      // Save authenticated user data globally
      login(response.token, response.fullName);

      // Redirect authenticated user
      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-2 text-center">
          Login
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          Sign in to access your workout dashboard.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm text-zinc-400">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-emerald-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm text-zinc-400">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-emerald-500"
              required
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold py-3 rounded-xl transition duration-300"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Register link */}
        <p className="text-zinc-400 text-sm mt-6 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-400 hover:text-emerald-300 font-medium transition"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;