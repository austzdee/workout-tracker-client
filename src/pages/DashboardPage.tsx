import { useEffect, useState } from "react";

import WorkoutCard from "../components/WorkoutCard";
import CreateWorkoutForm from "../components/CreateWorkoutForm";

import { useAuth } from "../context/AuthContext";

import { getWorkoutSummary } from "../services/reportService";
import {
  deleteWorkoutPlan,
  getWorkoutPlans,
} from "../services/workoutService";

import type { WorkoutSummaryReport } from "../types/reports";
import type { WorkoutPlan } from "../types/workout";

function DashboardPage() {
  // Read the authenticated user's display name from the global auth context.
  const { fullName } = useAuth();

  const [summary, setSummary] = useState<WorkoutSummaryReport | null>(null);
  const [workouts, setWorkouts] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        // Load summary statistics and workout plans at the same time.
        const [summaryData, workoutData] = await Promise.all([
          getWorkoutSummary(),
          getWorkoutPlans(),
        ]);

        setSummary(summaryData);
        setWorkouts(Array.isArray(workoutData) ? workoutData : []);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  function handleWorkoutCreated(workout: WorkoutPlan) {
    setWorkouts((currentWorkouts) => [workout, ...currentWorkouts]);
  }
  async function handleDeleteWorkout(id: number) {
    await deleteWorkoutPlan(id);

    setWorkouts((currentWorkouts) =>
      currentWorkouts.filter((workout) => workout.id !== id)
    );
  }
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold">Dashboard</h1>

          <p className="text-zinc-400 mt-2">
            Welcome back, {fullName}
          </p>
        </header>

        {loading ? (
          <p className="text-zinc-400">Loading dashboard...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <DashboardCard
                title="Total Workouts"
                value={summary?.totalWorkouts ?? 0}
              />

              <DashboardCard
                title="Total Exercises"
                value={summary?.totalExercises ?? 0}
              />

              <DashboardCard
                title="Total Volume"
                value={summary?.totalVolumeLifted ?? 0}
              />

              <DashboardCard
                title="Upcoming"
                value={summary?.upcomingWorkouts ?? 0}
              />
            </div>

            <CreateWorkoutForm onWorkoutCreated={handleWorkoutCreated} />

            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-5">Workout Plans</h2>

              {workouts.length === 0 ? (
                <p className="text-zinc-400">No workout plans yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {workouts.map((workout) => (
                    <WorkoutCard
                      key={workout.id}
                      workout={workout}
                      onDelete={handleDeleteWorkout}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

function DashboardCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
      <p className="text-zinc-400 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-3">{value}</h2>
    </div>
  );
}

export default DashboardPage;