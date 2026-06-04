import { Link } from "react-router-dom";

function LandingNavbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-white"
        >
          FitTrack
        </Link>

        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-300">
          <a href="#features" className="hover:text-emerald-400 transition">
            Features
          </a>

          <a href="#progress" className="hover:text-emerald-400 transition">
            Progress
          </a>

          <a href="#membership" className="hover:text-emerald-400 transition">
            Membership
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2.5 rounded-full border border-emerald-400/50 text-emerald-300 font-semibold hover:bg-emerald-400 hover:text-zinc-950 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2.5 rounded-full bg-emerald-400 text-zinc-950 font-bold hover:bg-emerald-300 transition shadow-lg shadow-emerald-500/20"
          >
            Join Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default LandingNavbar;