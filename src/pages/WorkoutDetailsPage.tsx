import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  deleteWorkoutPlan,
  getWorkoutPlanById,
} from "../services/workoutService";

import type { WorkoutPlan } from "../types/workout";

const WorkoutDetailsPage = () => {
  // Extract the workout ID from the route: /workouts/:id
  const { id } = useParams();

  // Used for redirecting after successful delete.
  const navigate = useNavigate();

  const [workout, setWorkout] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWorkout() {
      try {
        // Stop early if the URL does not contain a valid workout ID.
        if (!id) {
          setError("Workout ID is missing.");
          return;
        }

        // Fetch the selected workout from the API.
        const workoutData = await getWorkoutPlanById(Number(id));

        setWorkout(workoutData);
      } catch (err) {
        console.error(err);
        setError("Failed to load workout details.");
      } finally {
        setLoading(false);
      }
    }

    loadWorkout();
  }, [id]);

  async function handleDeleteWorkout() {
    if (!workout) return;

    // Confirm destructive action before deleting user data.
    const confirmed = window.confirm(
      "Are you sure you want to delete this workout?"
    );

    if (!confirmed) return;

    try {
      await deleteWorkoutPlan(workout.id);

      // Return user to dashboard after successful delete.
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to delete workout.");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white p-8">
        <p className="text-zinc-400">Loading workout details...</p>
      </main>
    );
  }

  if (error || !workout) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white p-8">
        <p className="text-red-400">{error || "Workout not found."}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Workout overview and page actions */}
        <div className="flex items-start justify-between mb-8">
          <div>
        
            <h1 className="text-4xl font-bold">{workout.title}</h1>

            <p className="text-zinc-400 mt-3">
              {workout.notes || "No workout notes provided."}
            </p>

            <p className="text-zinc-500 mt-2 text-sm">
              Scheduled: {new Date(workout.scheduledDate).toLocaleString()}
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to={`/workouts/${workout.id}/edit`}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold transition"
            >
              Edit
            </Link>

            <button
              type="button"
              onClick={handleDeleteWorkout}
              className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg font-semibold transition"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Exercise list belonging to this workout */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Exercises</h2>

          {workout.exercises.length === 0 ? (
            <p className="text-zinc-400">No exercises added yet.</p>
          ) : (
            <div className="grid gap-5">
              {workout.exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-semibold">{exercise.name}</h3>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-zinc-500 text-sm">Sets</p>
                      <p className="text-lg font-bold">{exercise.sets}</p>
                    </div>

                    <div>
                      <p className="text-zinc-500 text-sm">Reps</p>
                      <p className="text-lg font-bold">{exercise.reps}</p>
                    </div>

                    <div>
                      <p className="text-zinc-500 text-sm">Weight</p>
                      <p className="text-lg font-bold">{exercise.weight} kg</p>
                    </div>
                  </div>

                  {exercise.comment && (
                    <div className="mt-5">
                      <p className="text-zinc-500 text-sm">Comment</p>
                      <p className="text-zinc-300 mt-1">{exercise.comment}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default WorkoutDetailsPage;