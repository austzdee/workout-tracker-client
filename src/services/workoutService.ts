import api from '../api/axios'
import type { CreateWorkoutPlanRequest, WorkoutPlan } from '../types/workout'

export async function getWorkoutPlans(): Promise<WorkoutPlan[]> {
  const response = await api.get<WorkoutPlan[]>('/WorkoutPlans')
  return response.data
}

export async function createWorkoutPlan(
  data: CreateWorkoutPlanRequest
): Promise<WorkoutPlan> {
  const response = await api.post<WorkoutPlan>('/WorkoutPlans', data)
  return response.data
}