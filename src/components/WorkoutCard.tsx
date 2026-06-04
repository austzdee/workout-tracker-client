import { Link } from "react-router-dom";

import ExerciseList from "./ExerciseList";
import { deleteWorkoutPlan } from "../services/workoutService";

import type { WorkoutPlan } from "../types/workout";

type Props = {
  workout: WorkoutPlan;
  onDelete: (id: number) => void;
};

function WorkoutCard({ workout, onDelete }: Props) {
  /**
   * Deletes a workout plan after user confirmation.
   *
   * The parent dashboard owns the workout list state,
   * so this component only reports the deleted ID upward.
   */
  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this workout?"
    );

    if (!confirmed) return;

    await deleteWorkoutPlan(workout.id);

    onDelete(workout.id);
  }

  return (
  <article className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-400/60">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-emerald-400/10 text-2xl mb-4">
          🏋️
        </div>

        <Link
          to={`/workouts/${workout.id}`}
          className="block text-2xl font-bold hover:text-emerald-400 transition"
        >
          {workout.title}
        </Link>

        {workout.notes && (
          <p className="text-zinc-400 mt-3 leading-relaxed">
            {workout.notes}
          </p>
        )}

        <div className="mt-5 flex items-center gap-2 text-sm text-zinc-500">
          <span>📅</span>

          <span>
            {new Date(workout.scheduledDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="text-emerald-400 text-sm font-semibold">
        Active
      </div>
    </div>

    <div className="mt-6">
      <Link
        to={`/workouts/${workout.id}`}
        className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-zinc-950 hover:bg-emerald-400 transition"
      >
        View Workout
      </Link>
    </div>

    <div className="mt-6 flex items-center gap-5 border-t border-zinc-800 pt-5">
      <Link
        to={`/workouts/${workout.id}/edit`}
        className="text-blue-400 hover:text-blue-300 font-medium"
      >
        Edit
      </Link>

      <button
        type="button"
        onClick={handleDelete}
        className="text-red-400 hover:text-red-300 font-medium"
      >
        Delete
      </button>
    </div>

    <div className="mt-6 border-t border-zinc-800 pt-6">
      <ExerciseList workoutPlanId={workout.id} />
    </div>
  </article>
);
}

export default WorkoutCard;