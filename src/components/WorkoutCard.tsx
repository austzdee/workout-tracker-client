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
    <article className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          {/* Navigates to the full workout details page. */}
          <Link
            to={`/workouts/${workout.id}`}
            className="text-xl font-bold hover:text-blue-400 transition"
          >
            {workout.title}
          </Link>

          {workout.notes && (
            <p className="text-zinc-400 mt-2">
              {workout.notes}
            </p>
          )}

          <p className="text-sm text-zinc-500 mt-4">
            {new Date(workout.scheduledDate).toLocaleString()}
          </p>
        </div>

        <div className="flex gap-2">
          {/* Dedicated edit route keeps editing logic out of the card. */}
          <Link
            to={`/workouts/${workout.id}/edit`}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            Edit
          </Link>

          <button
            type="button"
            onClick={handleDelete}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Nested exercise management remains available from the dashboard card. */}
      <ExerciseList workoutPlanId={workout.id} />
    </article>
  );
}

export default WorkoutCard;