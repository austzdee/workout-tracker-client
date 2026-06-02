export type Exercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  comment: string | null;
};

export type WorkoutPlan = {
  id: number;
  title: string;
  notes: string | null;
  scheduledDate: string;
  exercises: Exercise[];
};

export type CreateWorkoutPlanRequest = {
  title: string;
  notes?: string;
  scheduledDate: string;
};