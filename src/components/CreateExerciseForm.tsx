import { useState } from "react";
import type { FormEvent } from "react";

import { createExercise } from "../services/exerciseService";
import type { Exercise } from "../types/exercise";

type Props = {
  workoutPlanId: number;
  onExerciseCreated: (exercise: Exercise) => void;
};

function CreateExerciseForm({
  workoutPlanId,
  onExerciseCreated,
}: Props) {
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const exercise = await createExercise(workoutPlanId, {
        name,
        sets: Number(sets),
        reps: Number(reps),
        weight: Number(weight),
      });

      onExerciseCreated(exercise);

      setName("");
      setSets("");
      setReps("");
      setWeight("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-2xl border border-zinc-700 bg-zinc-900/80 p-5 space-y-4"
    >
      <div>
        <h4 className="font-bold text-white">
          Add Exercise
        </h4>

        <p className="text-sm text-zinc-500 mt-1">
          Track sets, reps, and weight for this workout.
        </p>
      </div>

      <input
        type="text"
        placeholder="Exercise name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-700 text-sm outline-none focus:border-emerald-500"
        required
      />

      <div className="grid grid-cols-3 gap-2">
        <input
          type="number"
          placeholder="Sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-700 text-sm outline-none focus:border-emerald-500"
          required
          min={1}
        />

        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-700 text-sm outline-none focus:border-emerald-500"
          required
          min={1}
        />

        <input
          type="number"
          placeholder="Kg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-700 text-sm outline-none focus:border-emerald-500"
          required
          min={0}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-zinc-950 px-4 py-3 rounded-xl text-sm font-bold transition"
      >
        {loading ? "Adding..." : "Add Exercise"}
      </button>
    </form>
  );
}

export default CreateExerciseForm;