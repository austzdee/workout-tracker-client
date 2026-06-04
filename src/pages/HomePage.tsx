import { Link } from "react-router-dom";
import LandingNavbar from "../components/LandingNavbar";

function HomePage() {
  return (
    <>
      <LandingNavbar />

      <main className="min-h-screen bg-zinc-950 text-white">
        <section className="relative overflow-hidden min-h-[90vh] flex items-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.25),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#09090b_45%,_#022c22_100%)]" />

          <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute left-10 bottom-10 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300 font-semibold mb-6">
                Premium Fitness & Progress Tracking
              </p>

              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                Train with Purpose.
                <span className="block text-emerald-400">
                  Progress with Confidence.
                </span>
              </h1>

              <p className="text-zinc-300 text-lg md:text-xl mt-6 max-w-xl leading-relaxed">
                A modern fitness platform for planning workouts, tracking
                exercises, monitoring progress, and building a consistent
                training lifestyle.
              </p>

              <div className="flex flex-wrap gap-4 mt-9">
                <Link
                  to="/register"
                  className="bg-emerald-400 hover:bg-emerald-300 text-zinc-950 px-8 py-4 rounded-full font-bold transition shadow-lg shadow-emerald-500/20"
                >
                  Start Free
                </Link>

                <Link
                  to="/login"
                  className="border border-zinc-600 hover:border-emerald-400 px-8 py-4 rounded-full font-bold transition"
                >
                  Member Login
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12 max-w-xl">
                <HeroStat value="128+" label="Workouts" />
                <HeroStat value="87%" label="Consistency" />
                <HeroStat value="42k" label="Volume kg" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-emerald-400/20 to-fuchsia-500/20 blur-2xl" />

              <div className="relative rounded-[2rem] border border-zinc-700 bg-zinc-950/70 p-5 shadow-2xl backdrop-blur-xl">
                <div className="rounded-[1.5rem] bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-6">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <p className="text-sm text-zinc-400">Today&apos;s Plan</p>
                      <h3 className="text-2xl font-bold mt-1">
                        Strength Session
                      </h3>
                    </div>

                    <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                      Active
                    </span>
                  </div>

                  <div className="space-y-4">
                    <PreviewExercise
                      name="Bench Press"
                      meta="4 sets × 8 reps · 80kg"
                    />
                    <PreviewExercise
                      name="Deadlift"
                      meta="5 sets × 5 reps · 120kg"
                    />
                    <PreviewExercise
                      name="Shoulder Press"
                      meta="3 sets × 10 reps · 40kg"
                    />
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4">
                      <p className="text-zinc-500 text-sm">Weekly Goal</p>
                      <p className="text-2xl font-bold text-emerald-400 mt-2">
                        4 / 5
                      </p>
                    </div>

                    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4">
                      <p className="text-zinc-500 text-sm">Progress</p>
                      <p className="text-2xl font-bold text-emerald-400 mt-2">
                        +18%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="max-w-7xl mx-auto px-6 py-20">
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

            <section className="max-w-7xl mx-auto px-6 py-24">
  <div className="text-center mb-14">
    <h2 className="text-4xl font-bold">
      Why Choose WorkoutTracker?
    </h2>

    <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
      Designed to help you stay accountable, track progress, and build
      long-term fitness habits.
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-8">
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
      <div className="text-4xl mb-4">🏋️</div>
      <h3 className="text-xl font-bold mb-3">
        Structured Training
      </h3>
      <p className="text-zinc-400">
        Build organized workout plans and stay focused on your goals.
      </p>
    </div>

    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
      <div className="text-4xl mb-4">📈</div>
      <h3 className="text-xl font-bold mb-3">
        Measure Progress
      </h3>
      <p className="text-zinc-400">
        Monitor improvements in volume, consistency, and performance.
      </p>
    </div>

    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
      <div className="text-4xl mb-4">🎯</div>
      <h3 className="text-xl font-bold mb-3">
        Achieve Results
      </h3>
      <p className="text-zinc-400">
        Stay motivated with a clear view of your fitness journey.
      </p>
    </div>
  </div>
</section>

        <section id="progress" className="bg-zinc-900 border-y border-zinc-800">
          <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8 text-center">
             <Stat value="500+" label="Workouts Completed" />
             <Stat value="95%" label="Consistency Rate" />
             <Stat value="24/7" label="Progress Tracking" />
          </div>
        </section>

        <section id="membership" className="max-w-4xl mx-auto px-6 py-24 text-center">
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

          <section className="max-w-7xl mx-auto px-6 py-24">
  <div className="text-center mb-14">
    <p className="text-emerald-400 font-semibold mb-3">
      Member Stories
    </p>

    <h2 className="text-4xl font-extrabold">
      Built for People Who Want Real Progress
    </h2>

    <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
      From structured training to consistent habits, WorkoutTracker helps users
      stay focused and accountable.
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-8">
    <TestimonialCard
      quote="WorkoutTracker helped me stay consistent with my strength sessions and finally see how much progress I was making week by week."
      name="Amelia Carter"
      role="Strength Training Member"
    />

    <TestimonialCard
      quote="The workout planning and exercise tracking makes training feel organised. I know exactly what I trained, when I trained, and how I improved."
      name="James Wilson"
      role="Fitness Enthusiast"
    />

    <TestimonialCard
      quote="I like how simple it is. I can create a workout, add exercises, track my routine, and stay accountable without overcomplicating things."
      name="Sophia Bennett"
      role="Wellness & Fitness Member"
    />
  </div>
</section>
      </main>
      <footer className="border-t border-zinc-800 bg-zinc-950">
  <div className="max-w-7xl mx-auto px-6 py-12">
    <div className="grid md:grid-cols-3 gap-10">
      <div>
        <h3 className="text-2xl font-bold text-emerald-400">
          WorkoutTracker
        </h3>

        <p className="text-zinc-400 mt-4 max-w-sm">
          Train smarter, track progress, and stay consistent on your fitness journey.
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Navigation</h4>

        <ul className="space-y-2 text-zinc-400">
          <li>
            <Link to="/" className="hover:text-emerald-400">
              Home
            </Link>
          </li>

          <li>
            <Link to="/login" className="hover:text-emerald-400">
              Login
            </Link>
          </li>

          <li>
            <Link to="/register" className="hover:text-emerald-400">
              Register
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Platform</h4>

        <ul className="space-y-2 text-zinc-400">
          <li>Workout Planning</li>
          <li>Exercise Tracking</li>
          <li>Progress Monitoring</li>
        </ul>
      </div>
    </div>

    <div className="border-t border-zinc-800 mt-10 pt-6 text-center text-zinc-500 text-sm">
      © 2026 WorkoutTracker. All rights reserved.
    </div>
  </div>
</footer>
    </>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-extrabold text-white">{value}</p>
      <p className="text-sm text-zinc-500 mt-1">{label}</p>
    </div>
  );
}

function PreviewExercise({ name, meta }: { name: string; meta: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-zinc-900 border border-zinc-800 p-4">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-zinc-500 mt-1">{meta}</p>
      </div>

      <div className="h-10 w-10 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-300 font-bold">
        ✓
      </div>
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

function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-xl transition duration-300 hover:-translate-y-2 hover:border-emerald-400/60 hover:shadow-emerald-500/10">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-fuchsia-500/10 opacity-0 transition duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="h-14 w-14 rounded-full bg-emerald-400 text-zinc-950 flex items-center justify-center font-extrabold">
            {initials}
          </div>

          <div className="text-amber-400 text-sm tracking-widest">
            ★★★★★
          </div>
        </div>

        <div className="text-emerald-400 text-5xl leading-none mb-4">
          “
        </div>

        <p className="text-zinc-300 leading-relaxed">
          {quote}
        </p>

        <div className="mt-8 pt-6 border-t border-zinc-800">
          <p className="font-bold text-white">
            {name}
          </p>

          <p className="text-sm text-zinc-500 mt-1">
            {role}
          </p>
        </div>
      </div>
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