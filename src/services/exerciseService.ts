// Shared Axios API instance
import api from '../api/axios'

// Exercise-related TypeScript types
import type {
  CreateExerciseRequest,
  Exercise,
} from '../types/exercise'

// Fetch all exercises for a specific workout plan
export async function getExercises(
  workoutPlanId: number
): Promise<Exercise[]> {
  const response = await api.get<Exercise[]>(
    `/WorkoutPlans/${workoutPlanId}/exercises`
  )

  return response.data
}

// Create a new exercise inside a workout plan
export async function createExercise(
  workoutPlanId: number,
  data: CreateExerciseRequest
): Promise<Exercise> {
  const response = await api.post<Exercise>(
    `/WorkoutPlans/${workoutPlanId}/exercises`,
    data
  )

  return response.data
}

// Update an existing exercise
export async function updateExercise(
  workoutPlanId: number,
  exerciseId: number,
  data: CreateExerciseRequest
): Promise<Exercise> {
  const response = await api.put<Exercise>(
    `/WorkoutPlans/${workoutPlanId}/exercises/${exerciseId}`,
    data
  )

  return response.data
}

// Delete an exercise
export async function deleteExercise(
  workoutPlanId: number,
  exerciseId: number
): Promise<void> {
  await api.delete(
    `/WorkoutPlans/${workoutPlanId}/exercises/${exerciseId}`
  )
}