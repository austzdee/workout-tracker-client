import type { WorkoutPlan } from '../types/workout'

type Props = {
  workout: WorkoutPlan
}

function WorkoutCard({ workout }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
      <h3 className="text-xl font-bold">{workout.title}</h3>

      {workout.notes && (
        <p className="text-zinc-400 mt-2">{workout.notes}</p>
      )}

      <p className="text-sm text-zinc-500 mt-4">
        {new Date(workout.scheduledDate).toLocaleString()}
      </p>
    </div>
  )
}

export default WorkoutCard