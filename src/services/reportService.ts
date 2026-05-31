import api from '../api/axios'
import type { WorkoutSummaryReport } from '../types/reports'

export async function getWorkoutSummary(): Promise<WorkoutSummaryReport> {
  const response = await api.get<WorkoutSummaryReport>('/Reports/summary')
  return response.data
}