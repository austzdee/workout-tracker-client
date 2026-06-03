import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-zinc-950 to-fuchsia-950/30" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-emerald-400 font-semibold mb-4">
              Premium Fitness Tracking
            </p>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Train Smarter. Track Better. Stay Consistent.
            </h1>

            <p className="text-zinc-300 text-lg mt-6 max-w-xl">
              A modern workout tracker designed to help you plan sessions,
              monitor exercises, measure progress, and build a stronger fitness
              lifestyle.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/register"
                className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-7 py-3 rounded-full font-bold transition"
              >
                Start Free
              </Link>

              <Link
                to="/login"
                className="border border-zinc-600 hover:border-emerald-400 px-7 py-3 rounded-full font-bold transition"
              >
                Sign In
              </Link>
            </div>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
            <div className="grid gap-4">
              <DashboardPreview title="Workouts Logged" value="128" />
              <DashboardPreview title="Weekly Consistency" value="87%" />
              <DashboardPreview title="Total Volume" value="42,500kg" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need to Manage Your Fitness Journey
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="Plan Workouts"
            text="Create structured workout plans with dates, notes, and clear training goals."
          />

          <FeatureCard
            title="Track Exercises"
            text="Log sets, reps, and weights so you can follow your strength progression."
          />

          <FeatureCard
            title="Monitor Progress"
            text="View summaries and reports that help you stay accountable over time."
          />
        </div>
      </section>

      <section className="bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8 text-center">
          <Stat value="JWT" label="Secure authentication" />
          <Stat value="CRUD" label="Workout and exercise management" />
          <Stat value="Live" label="Hosted full-stack deployment" />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-extrabold">
          Ready to Build a Stronger Routine?
        </h2>

        <p className="text-zinc-400 mt-4">
          Start tracking your workouts today and turn consistency into visible
          progress.
        </p>

        <Link
          to="/register"
          className="inline-block mt-8 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-8 py-3 rounded-full font-bold transition"
        >
          Create Free Account
        </Link>
      </section>
    </main>
  );
}

function DashboardPreview({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
      <p className="text-zinc-400 text-sm">{title}</p>
      <p className="text-3xl font-bold mt-2 text-emerald-400">{value}</p>
    </div>
  );
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7 hover:border-emerald-500/60 transition">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-zinc-400">{text}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-4xl font-extrabold text-emerald-400">{value}</p>
      <p className="text-zinc-400 mt-2">{label}</p>
    </div>
  );
}

export default HomePage;