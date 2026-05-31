import { useState } from 'react'

import { createExercise } from '../services/exerciseService'
import type { Exercise } from '../types/exercise'

type Props = {
  workoutPlanId: number
  onExerciseCreated: (exercise: Exercise) => void
}

function CreateExerciseForm({
  workoutPlanId,
  onExerciseCreated,
}: Props) {
  const [name, setName] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setLoading(true)

      const exercise = await createExercise(workoutPlanId, {
        name,
        sets: Number(sets),
        reps: Number(reps),
        weight: Number(weight),
      })

      onExerciseCreated(exercise)

      setName('')
      setSets('')
      setReps('')
      setWeight('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 space-y-3 border-t border-zinc-800 pt-4"
    >
      <h4 className="font-semibold text-sm text-zinc-300">
        Add Exercise
      </h4>

      <input
        type="text"
        placeholder="Exercise name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm outline-none focus:border-blue-500"
        required
      />

      <div className="grid grid-cols-3 gap-2">
        <input
          type="number"
          placeholder="Sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm outline-none focus:border-blue-500"
          required
          min={1}
        />

        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm outline-none focus:border-blue-500"
          required
          min={1}
        />

        <input
          type="number"
          placeholder="Kg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm outline-none focus:border-blue-500"
          required
          min={0}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold"
      >
        {loading ? 'Adding...' : 'Add Exercise'}
      </button>
    </form>
  )
}

export default CreateExerciseForm