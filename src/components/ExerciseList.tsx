import { useEffect, useState } from 'react'

import CreateExerciseForm from './CreateExerciseForm'
import { getExercises } from '../services/exerciseService'
import type { Exercise } from '../types/exercise'

type Props = {
  workoutPlanId: number
}

function ExerciseList({ workoutPlanId }: Props) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadExercises() {
      try {
        // Load all exercises attached to this specific workout plan
        const data = await getExercises(workoutPlanId)
        setExercises(data)
      } finally {
        setLoading(false)
      }
    }

    loadExercises()
  }, [workoutPlanId])

  function handleExerciseCreated(exercise: Exercise) {
    // Add the newly created exercise to the current UI immediately
    setExercises((currentExercises) => [
      exercise,
      ...currentExercises,
    ])
  }

  return (
    <div className="mt-5">
      {loading ? (
        <p className="text-sm text-zinc-500">
          Loading exercises...
        </p>
      ) : exercises.length === 0 ? (
        <p className="text-sm text-zinc-500">
          No exercises added yet.
        </p>
      ) : (
        <div className="space-y-3">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-zinc-800 rounded-xl p-3 border border-zinc-700"
            >
              <p className="font-semibold">
                {exercise.name}
              </p>

              <p className="text-sm text-zinc-400">
                {exercise.sets} sets × {exercise.reps} reps · {exercise.weight}kg
              </p>
            </div>
          ))}
        </div>
      )}

      <CreateExerciseForm
        workoutPlanId={workoutPlanId}
        onExerciseCreated={handleExerciseCreated}
      />
    </div>
  )
}

export default ExerciseList