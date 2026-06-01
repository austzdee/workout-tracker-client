import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CreateWorkoutPage from "./pages/CreateWorkoutPage";
import EditWorkoutPage from "./pages/EditWorkoutPage";
import WorkoutDetailsPage from "./pages/WorkoutDetailsPage";

function App() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-workout"
            element={
              <ProtectedRoute>
                <CreateWorkoutPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/workouts/:id"
            element={
              <ProtectedRoute>
                <WorkoutDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/workouts/:id/edit"
            element={
              <ProtectedRoute>
                <EditWorkoutPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;