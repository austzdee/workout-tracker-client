// Represents a single exercise belonging to a workout plan
export type Exercise = {
  id: number
  name: string
  sets: number
  reps: number
  weight: number
}

// Payload used when creating a new exercise
export type CreateExerciseRequest = {
  name: string
  sets: number
  reps: number
  weight: number
}