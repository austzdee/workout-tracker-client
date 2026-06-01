import { useState } from 'react'

import ExerciseList from './ExerciseList'
import {
  deleteWorkoutPlan,
  updateWorkoutPlan,
} from '../services/workoutService'
import type {
  CreateWorkoutPlanRequest,
  WorkoutPlan,
} from '../types/workout'

type Props = {
  workout: WorkoutPlan
  onDelete: (id: number) => void
  onUpdated: (workout: WorkoutPlan) => void
}

function WorkoutCard({
  workout,
  onDelete,
  onUpdated,
}: Props) {
  // Controls whether the card is currently in edit mode
  const [isEditing, setIsEditing] = useState(false)

  // Local temporary edit form state
  const [formData, setFormData] =
    useState<CreateWorkoutPlanRequest>({
      title: workout.title,
      notes: workout.notes ?? '',
      scheduledDate: workout.scheduledDate,
    })

  async function handleSave() {
    // Persist updates to backend API
    const updatedWorkout = await updateWorkoutPlan(
      workout.id,
      formData
    )

    // Synchronize parent dashboard state
    onUpdated(updatedWorkout)

    // Exit edit mode
    setIsEditing(false)
  }

  async function handleDelete() {
    // Delete workout from backend
    await deleteWorkoutPlan(workout.id)

    // Notify parent component
    onDelete(workout.id)
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
      {isEditing ? (
        <div className="space-y-4">
          {/* Workout title */}
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
          />

          {/* Workout notes */}
          <textarea
            value={formData.notes}
            onChange={(e) =>
              setFormData({
                ...formData,
                notes: e.target.value,
              })
            }
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
            rows={3}
          />

          {/* Workout scheduled date */}
          <input
            type="datetime-local"
            value={formData.scheduledDate}
            onChange={(e) =>
              setFormData({
                ...formData,
                scheduledDate: e.target.value,
              })
            }
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
          />

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold">
                {workout.title}
              </h3>

              {workout.notes && (
                <p className="text-zinc-400 mt-2">
                  {workout.notes}
                </p>
              )}

              <p className="text-sm text-zinc-500 mt-4">
                {new Date(
                  workout.scheduledDate
                ).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Nested exercise management */}
          <ExerciseList workoutPlanId={workout.id} />
        </>
      )}
    </div>
  )
}

export default WorkoutCard