import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="text-xl font-bold tracking-wide hover:text-gray-300 transition"
        >
          Workout Tracker
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="hover:text-gray-300 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/create-workout"
            className="hover:text-gray-300 transition"
          >
            Create Workout
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;