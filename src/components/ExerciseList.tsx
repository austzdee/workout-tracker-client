import { useEffect, useState } from 'react'

import CreateExerciseForm from './CreateExerciseForm'
import {
  deleteExercise,
  getExercises,
  updateExercise,
} from '../services/exerciseService'
import type { Exercise } from '../types/exercise'

type Props = {
  workoutPlanId: number
}

function ExerciseList({ workoutPlanId }: Props) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)

  // Stores the ID of the exercise currently being edited
  const [editingExerciseId, setEditingExerciseId] = useState<number | null>(null)

  // Temporary form state used only while editing an exercise
  const [editForm, setEditForm] = useState({
    name: '',
    sets: 0,
    reps: 0,
    weight: 0,
  })

  useEffect(() => {
    async function loadExercises() {
      try {
        // Load all exercises belonging to this workout plan
        const data = await getExercises(workoutPlanId)
        setExercises(data)
      } finally {
        setLoading(false)
      }
    }

    loadExercises()
  }, [workoutPlanId])

  function handleExerciseCreated(exercise: Exercise) {
    // Add new exercise to UI immediately after successful API creation
    setExercises((currentExercises) => [exercise, ...currentExercises])
  }

  async function handleDeleteExercise(exerciseId: number) {
    // Delete exercise from backend first
    await deleteExercise(workoutPlanId, exerciseId)

    // Remove deleted exercise from local UI state
    setExercises((currentExercises) =>
      currentExercises.filter((exercise) => exercise.id !== exerciseId)
    )
  }

  function handleStartEdit(exercise: Exercise) {
    // Enable edit mode for selected exercise
    setEditingExerciseId(exercise.id)

    // Pre-fill edit form with current exercise values
    setEditForm({
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
    })
  }

  async function handleSaveEdit(exerciseId: number) {
    // Persist edited values to backend
    const updatedExercise = await updateExercise(
      workoutPlanId,
      exerciseId,
      editForm
    )

    // Replace only the updated exercise in local state
    setExercises((currentExercises) =>
      currentExercises.map((exercise) =>
        exercise.id === exerciseId ? updatedExercise : exercise
      )
    )

    // Exit edit mode
    setEditingExerciseId(null)
  }

  return (
    <div className="mt-5">
      {loading ? (
        <p className="text-sm text-zinc-500">Loading exercises...</p>
      ) : exercises.length === 0 ? (
        <p className="text-sm text-zinc-500">No exercises added yet.</p>
      ) : (
        <div className="space-y-3">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="rounded-2xl border border-zinc-700 bg-zinc-800/80 p-5 transition hover:border-emerald-400/50"
            >
              {editingExerciseId === exercise.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        name: e.target.value,
                      })
                    }
                    className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm outline-none focus:border-emerald-500"
                  />

                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      value={editForm.sets}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          sets: Number(e.target.value),
                        })
                      }
                      className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm outline-none focus:border-blue-500"
                    />

                    <input
                      type="number"
                      value={editForm.reps}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          reps: Number(e.target.value),
                        })
                      }
                      className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm outline-none focus:border-blue-500"
                    />

                    <input
                      type="number"
                      value={editForm.weight}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          weight: Number(e.target.value),
                        })
                      }
                      className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(exercise.id)}
                      className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3 py-1.5 rounded-lg text-xs font-semibold"
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditingExerciseId(null)}
                      className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1.5 rounded-lg text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
  <div className="space-y-4">
    <div className="flex items-start gap-4">
      <div className="h-12 w-12 rounded-2xl bg-emerald-400/10 flex items-center justify-center text-xl">
        💪
      </div>

      <div>
        <p className="font-bold text-lg">
          {exercise.name}
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-xs text-zinc-300">
            🏋️ {exercise.sets} Sets
          </span>

          <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-xs text-zinc-300">
            🔁 {exercise.reps} Reps
          </span>

          <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-xs text-zinc-300">
            ⚡ {exercise.weight}kg
          </span>
        </div>
      </div>
    </div>

    <div className="flex gap-3 border-t border-zinc-700 pt-4 mt-5">
      <button
        type="button"
        onClick={() => handleStartEdit(exercise)}
        className="text-blue-400 hover:text-blue-300 font-medium transition"
      >
        Edit
      </button>

      <button
        type="button"
        onClick={() => handleDeleteExercise(exercise.id)}
        className="text-red-400 hover:text-red-300 font-medium transition"
      >
        Delete
      </button>
    </div>
  </div>
</>
              )}
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