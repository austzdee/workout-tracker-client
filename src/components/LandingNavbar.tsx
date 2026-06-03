import { Link } from "react-router-dom";

function LandingNavbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight"
        >
          FitTrack
        </Link>

        <div className="hidden md:flex gap-8 text-sm text-zinc-300">
          <a href="#features">Features</a>
          <a href="#progress">Progress</a>
          <a href="#membership">Membership</a>
        </div>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-5 py-2 rounded-full border border-zinc-700 hover:border-emerald-500 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold transition"
          >
            Join Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default LandingNavbar;