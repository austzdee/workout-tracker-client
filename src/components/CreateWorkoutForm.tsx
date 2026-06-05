import { useState } from 'react'

import type { WorkoutPlan } from '../types/workout'
import { createWorkoutPlan } from '../services/workoutService'

type Props = {
  onWorkoutCreated: (workout: WorkoutPlan) => void
}

function CreateWorkoutForm({ onWorkoutCreated }: Props) {
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [scheduledDate, setScheduledDate] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setLoading(true)

      const workout = await createWorkoutPlan({
        title,
        notes,
        scheduledDate,
      })

      onWorkoutCreated(workout)

      setTitle('')
      setNotes('')
      setScheduledDate('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-10 space-y-4"
    >
      <h2 className="text-2xl font-bold">Create Workout</h2>

      <input
        type="text"
        placeholder="Workout title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
        required
      />

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
      />

      <input
        type="datetime-local"
        value={scheduledDate}
        onChange={(e) => setScheduledDate(e.target.value)}
        className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
        required
      />

    <button
      type="submit"
      disabled={loading}
     className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-zinc-950 px-5 py-3 rounded-lg font-semibold transition"
     >
  {loading ? "Creating..." : "Create Workout"}
</button>
    </form>
  )
}

export default CreateWorkoutForm