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
        <div className="max-w-7xl mx-auto">
          <p className="text-zinc-400">Loading workout details...</p>
        </div>
      </main>
    );
  }

  if (error || !workout) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-400">{error || "Workout not found."}</p>
        </div>
      </main>
    );
  }

  const scheduledDate = new Date(workout.scheduledDate).toLocaleString();

  const totalExercises = workout.exercises.length;

  const totalVolume = workout.exercises.reduce(
    (total, exercise) =>
      total + exercise.sets * exercise.reps * exercise.weight,
    0
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back navigation */}
        <Link
          to="/dashboard"
          className="inline-flex items-center text-sm text-zinc-400 hover:text-emerald-400 transition mb-6"
        >
          ← Back to Dashboard
        </Link>

        {/* Workout hero section */}
        <section className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-emerald-950 p-8 md:p-10 mb-10 shadow-2xl">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="text-emerald-400 font-semibold mb-3">
                Workout Details
              </p>

              <h1 className="text-4xl md:text-5xl font-extrabold">
                {workout.title}
              </h1>

              <p className="text-zinc-400 mt-4 max-w-2xl text-lg">
                {workout.notes || "No workout notes provided."}
              </p>

              <p className="text-zinc-500 mt-4 text-sm">
                Scheduled: {scheduledDate}
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                to={`/workouts/${workout.id}/edit`}
                className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-5 py-3 rounded-xl font-bold transition"
              >
                Edit Workout
              </Link>

              <button
                type="button"
                onClick={handleDeleteWorkout}
                className="bg-red-600 hover:bg-red-500 px-5 py-3 rounded-xl font-bold transition"
              >
                Delete
              </button>
            </div>
          </div>
        </section>

        {/* Workout summary cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <WorkoutMetricCard
            icon="💪"
            title="Exercises"
            value={totalExercises}
            description="Exercises in this workout"
          />

          <WorkoutMetricCard
            icon="⚡"
            title="Total Volume"
            value={totalVolume}
            description="Sets × reps × weight"
          />

          <WorkoutMetricCard
            icon="📅"
            title="Scheduled"
            value={scheduledDate}
            description="Planned workout time"
          />
        </section>

        {/* Exercise list belonging to this workout */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              Exercises
            </h2>

            <p className="text-zinc-400 mt-2">
              Review the exercises included in this workout plan.
            </p>
          </div>

          {workout.exercises.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-900/60 p-10 text-center">
              <p className="text-xl font-bold">
                No exercises added yet.
              </p>

              <p className="text-zinc-400 mt-2">
                Add exercises from the dashboard to build out this workout.
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              {workout.exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl transition hover:border-emerald-400/60"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-400/10 flex items-center justify-center text-xl">
                      💪
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold">
                        {exercise.name}
                      </h3>

                      <div className="flex flex-wrap gap-3 mt-4">
                        <ExerciseMetric label="Sets" value={exercise.sets} />
                        <ExerciseMetric label="Reps" value={exercise.reps} />
                        <ExerciseMetric
                          label="Weight"
                          value={`${exercise.weight} kg`}
                        />
                      </div>

                      {exercise.comment && (
                        <div className="mt-5 border-t border-zinc-800 pt-4">
                          <p className="text-zinc-500 text-sm">
                            Comment
                          </p>

                          <p className="text-zinc-300 mt-1">
                            {exercise.comment}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

function WorkoutMetricCard({
  icon,
  title,
  value,
  description,
}: {
  icon: string;
  title: string;
  value: string | number;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-400/60">
      <div className="h-12 w-12 rounded-2xl bg-emerald-400/10 flex items-center justify-center text-2xl">
        {icon}
      </div>

      <p className="text-zinc-400 text-sm mt-6">
        {title}
      </p>

      <p className="text-3xl font-extrabold mt-2 text-white">
        {value}
      </p>

      <p className="text-zinc-500 text-sm mt-3">
        {description}
      </p>
    </div>
  );
}

function ExerciseMetric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3">
      <p className="text-xs text-zinc-500">
        {label}
      </p>

      <p className="text-lg font-bold text-white mt-1">
        {value}
      </p>
    </div>
  );
}

export default WorkoutDetailsPage;