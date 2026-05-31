export type WorkoutPlan = {
  id: number
  title: string
  notes: string | null
  scheduledDate: string
}

export type CreateWorkoutPlanRequest = {
  title: string
  notes?: string
  scheduledDate: string
}