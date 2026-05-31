import type { WorkoutPlan } from '../types/workout'

type Props = {
  workout: WorkoutPlan
  onDelete: (id: number) => void
}

function WorkoutCard({ workout, onDelete }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
      <h3 className="text-xl font-bold">{workout.title}</h3>

      {workout.notes && (
        <p className="text-zinc-400 mt-2">{workout.notes}</p>
      )}

      <p className="text-sm text-zinc-500 mt-4">
        {new Date(workout.scheduledDate).toLocaleString()}
      </p>

      <button
        onClick={() => onDelete(workout.id)}
        className="mt-5 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold"
      >
        Delete
      </button>
    </div>
  )
}

export default WorkoutCard