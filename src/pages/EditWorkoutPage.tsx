import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getWorkoutPlanById,
  updateWorkoutPlan,
} from "../services/workoutService";

const EditWorkoutPage = () => {
  // Read workout ID from the route: /workouts/:id/edit
  const { id } = useParams();

  // Used to redirect after a successful update.
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWorkout() {
      try {
        if (!id) {
          setError("Workout ID is missing.");
          return;
        }

        // Load the existing workout so the form can be prefilled.
        const workout = await getWorkoutPlanById(Number(id));

        setTitle(workout.title);
        setNotes(workout.notes ?? "");

        // Convert API date value into a format accepted by datetime-local input.
        setScheduledDate(workout.scheduledDate.slice(0, 16));
      } catch (err) {
        console.error(err);
        setError("Failed to load workout.");
      } finally {
        setLoading(false);
      }
    }

    loadWorkout();
  }, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!id) {
      setError("Workout ID is missing.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await updateWorkoutPlan(Number(id), {
        title,
        notes,
        scheduledDate,
      });

      // Return to the details page after a successful update.
      navigate(`/workouts/${id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to update workout.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white p-8">
        <p className="text-zinc-400">Loading workout...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Edit Workout</h1>

        {error && (
          <p className="bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg p-4 mb-6">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Workout Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Notes
            </label>

            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Scheduled Date
            </label>

            <input
              type="datetime-local"
              value={scheduledDate}
              onChange={(event) => setScheduledDate(event.target.value)}
              required
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 px-5 py-3 rounded-lg font-semibold transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate(`/workouts/${id}`)}
              className="bg-zinc-700 hover:bg-zinc-600 px-5 py-3 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditWorkoutPage;