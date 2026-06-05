import { useEffect, useState } from "react";

import WorkoutCard from "../components/WorkoutCard";
import CreateWorkoutForm from "../components/CreateWorkoutForm";
import { useAuth } from "../context/AuthContext";

import { getWorkoutSummary } from "../services/reportService";
import { getWorkoutPlans } from "../services/workoutService";

import type { WorkoutSummaryReport } from "../types/reports";
import type { WorkoutPlan } from "../types/workout";

function DashboardPage() {
  // Read the authenticated user's display name from the global auth context.
  const { fullName } = useAuth();

  // Stores dashboard summary data returned by the reports API.
  const [summary, setSummary] = useState<WorkoutSummaryReport | null>(null);

  // Stores all workout plans belonging to the authenticated user.
  const [workouts, setWorkouts] = useState<WorkoutPlan[]>([]);

  // Controls the loading state while dashboard data is being fetched.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        // Load summary statistics and workout plans in parallel for better performance.
        const [summaryData, workoutData] = await Promise.all([
          getWorkoutSummary(),
          getWorkoutPlans(),
        ]);

        setSummary(summaryData);

        // Defensive check to ensure the dashboard never crashes if API shape changes.
        setWorkouts(Array.isArray(workoutData) ? workoutData : []);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  function handleWorkoutCreated(workout: WorkoutPlan) {
    // Add the newly created workout to the top of the dashboard list.
    setWorkouts((currentWorkouts) => [workout, ...currentWorkouts]);
  }

  function handleDeleteWorkout(id: number) {
    // Remove deleted workout from local UI state after the child card deletes it from API.
    setWorkouts((currentWorkouts) =>
      currentWorkouts.filter((workout) => workout.id !== id),
    );
  }

  const averageExercises =
    workouts.length === 0
      ? 0
      : Math.round(
          workouts.reduce(
            (total, workout) => total + workout.exercises.length,
            0,
          ) / workouts.length,
        );

  const mostActiveDay =
    workouts.length === 0 ? "No data" : getMostActiveDay(workouts);

  const workoutsThisWeek = workouts.filter((workout) =>
    isThisWeek(new Date(workout.scheduledDate)),
  ).length;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Premium dashboard welcome banner */}
        <header className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-emerald-950 p-8 md:p-10 mb-10 shadow-2xl">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="text-emerald-400 font-semibold mb-3">
                Your Fitness Dashboard
              </p>

              <h1 className="text-4xl md:text-5xl font-extrabold">
                Welcome back, {fullName || "Athlete"} 👋
              </h1>

              <p className="text-zinc-400 mt-4 max-w-2xl text-lg">
                Stay consistent. Every workout you complete moves you closer to
                your goals.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-6 py-4">
              <p className="text-sm text-zinc-400">Today&apos;s Focus</p>
              <p className="text-xl font-bold text-emerald-300 mt-1">
                Train with Purpose
              </p>
            </div>
          </div>
        </header>

        {loading ? (
          <p className="text-zinc-400">Loading dashboard...</p>
        ) : (
          <>
            {/* Summary statistics */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
              <DashboardCard
                icon="🏋️"
                title="Total Workouts"
                value={summary?.totalWorkouts ?? 0}
                description="Completed workout plans"
              />

              <DashboardCard
                icon="💪"
                title="Total Exercises"
                value={summary?.totalExercises ?? 0}
                description="Exercises logged"
              />

              <DashboardCard
                icon="⚡"
                title="Total Volume"
                value={summary?.totalVolumeLifted ?? 0}
                description="Total weight lifted"
              />

              <DashboardCard
                icon="📅"
                title="Upcoming"
                value={summary?.upcomingWorkouts ?? 0}
                description="Scheduled sessions"
              />
            </section>

            {/* Workout activity chart */}
            <section className="mb-12">
              <div className="mb-5">
                <h2 className="text-2xl font-bold">Workout Activity</h2>

                <p className="text-zinc-400 mt-2">
                  A snapshot of your recent training consistency.
                </p>
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-xl">
                <div className="grid grid-cols-7 gap-3 items-end h-48">
                  <div className="bg-emerald-500 rounded-t-xl h-24" />
                  <div className="bg-emerald-500 rounded-t-xl h-16" />
                  <div className="bg-emerald-500 rounded-t-xl h-32" />
                  <div className="bg-emerald-500 rounded-t-xl h-20" />
                  <div className="bg-emerald-500 rounded-t-xl h-40" />
                  <div className="bg-emerald-500 rounded-t-xl h-14" />
                  <div className="bg-emerald-500 rounded-t-xl h-28" />
                </div>

                <div className="grid grid-cols-7 gap-3 text-center text-xs text-zinc-500 mt-4">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/60">
                  <p className="text-2xl mb-2">🔥</p>
                  <p className="text-2xl font-bold">{workoutsThisWeek}</p>
                  <p className="text-zinc-500 text-sm mt-1">
                    Workouts This Week
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/60">
                  <p className="text-2xl mb-2">🏆</p>
                  <p className="text-2xl font-bold">{mostActiveDay}</p>
                  <p className="text-zinc-500 text-sm mt-1">Most Active Day</p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/60">
                  <p className="text-2xl mb-2">⚡</p>
                  <p className="text-2xl font-bold">{averageExercises}</p>
                  <p className="text-zinc-500 text-sm mt-1">Avg Exercises</p>
                </div>
              </div>
            </section>

            {/* Workout creation form */}
            <section className="mb-12">
              <div className="mb-5">
                <h2 className="text-2xl font-bold">Plan a New Workout</h2>

                <p className="text-zinc-400 mt-2">
                  Create your next training session and keep your routine
                  organised.
                </p>
              </div>

              <CreateWorkoutForm onWorkoutCreated={handleWorkoutCreated} />
            </section>

            {/* Workout list */}
            <section>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Recent Workout Plans</h2>

                  <p className="text-zinc-400 mt-2">
                    Review, edit, and manage your saved workout plans.
                  </p>
                </div>

                <p className="text-sm text-zinc-500">
                  {workouts.length} workout{workouts.length === 1 ? "" : "s"}{" "}
                  found
                </p>
              </div>

              {workouts.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-900/60 p-10 text-center">
                  <p className="text-xl font-bold">No workout plans yet.</p>

                  <p className="text-zinc-400 mt-2">
                    Create your first workout plan above to start tracking your
                    progress.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

function DashboardCard({
  icon,
  title,
  value,
  description,
}: {
  icon: string;
  title: string;
  value: number;
  description: string;
}) {
  return (
    <div className="group rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-400/60">
      <div className="flex items-center justify-between">
        <div className="h-12 w-12 rounded-2xl bg-emerald-400/10 flex items-center justify-center text-2xl">
          {icon}
        </div>

        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Live
        </span>
      </div>

      <p className="text-zinc-400 text-sm mt-6">{title}</p>

      <h2 className="text-4xl font-extrabold mt-2 text-white">{value}</h2>

      <p className="text-zinc-500 text-sm mt-3">{description}</p>
    </div>
  );
}

function isThisWeek(date: Date) {
  const today = new Date();

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return date >= startOfWeek && date <= endOfWeek;
}

function getMostActiveDay(workouts: WorkoutPlan[]) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const counts: Record<string, number> = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  };

  workouts.forEach((workout) => {
    const day = days[new Date(workout.scheduledDate).getDay()];
    counts[day] += 1;
  });

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

export default DashboardPage;
