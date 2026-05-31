// Centralized API client configured with base URL and JWT interceptor
import api from '../api/axios'

// Shared workout-related TypeScript types
import type {
  CreateWorkoutPlanRequest,
  WorkoutPlan,
} from '../types/workout'

// Fetch all workout plans belonging to the authenticated user
export async function getWorkoutPlans(): Promise<WorkoutPlan[]> {
  const response = await api.get<WorkoutPlan[]>('/WorkoutPlans')
  return response.data
}

// Create a new workout plan for the authenticated user
export async function createWorkoutPlan(
  data: CreateWorkoutPlanRequest
): Promise<WorkoutPlan> {
  const response = await api.post<WorkoutPlan>('/WorkoutPlans', data)
  return response.data
}

// Update an existing workout plan by ID
export async function updateWorkoutPlan(
  id: number,
  data: CreateWorkoutPlanRequest
): Promise<WorkoutPlan> {
  const response = await api.put<WorkoutPlan>(`/WorkoutPlans/${id}`, data)
  return response.data
}

// Delete an existing workout plan by ID
export async function deleteWorkoutPlan(id: number): Promise<void> {
  await api.delete(`/WorkoutPlans/${id}`)
}