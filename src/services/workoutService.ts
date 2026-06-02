// Centralized Axios client configuration.
//
// Responsibilities:
// - API base URL configuration
// - JWT token attachment
// - request/response interception
// - shared HTTP configuration
import api from "../api/axios";

// Shared workout domain models and request contracts.
import type {
  CreateWorkoutPlanRequest,
  WorkoutPlan,
} from "../types/workout";

/**
 * Base API endpoint for workout plan operations.
 *
 * Centralizing endpoint paths improves maintainability
 * and reduces duplication across service functions.
 */
const WORKOUTS_ENDPOINT = "/WorkoutPlans";

/**
 * Retrieves all workout plans belonging to the authenticated user.
 */
export async function getWorkoutPlans(): Promise<WorkoutPlan[]> {
  const response = await api.get<WorkoutPlan[]>(WORKOUTS_ENDPOINT);

  return response.data;
}

/**
 * Retrieves a single workout plan by its identifier.
 *
 * Primary usage:
 * - workout details page
 * - workout editing flow
 * - future analytics and reporting views
 */
export async function getWorkoutPlanById(
  id: number
): Promise<WorkoutPlan> {
  const response = await api.get<WorkoutPlan>(
    `${WORKOUTS_ENDPOINT}/${id}`
  );

  return response.data;
}

/**
 * Creates a new workout plan for the authenticated user.
 */
export async function createWorkoutPlan(
  data: CreateWorkoutPlanRequest
): Promise<WorkoutPlan> {
  const response = await api.post<WorkoutPlan>(
    WORKOUTS_ENDPOINT,
    data
  );

  return response.data;
}

/**
 * Updates an existing workout plan.
 *
 * Future enhancement considerations:
 * - dedicated update DTO
 * - PATCH support
 * - optimistic UI updates
 */
export async function updateWorkoutPlan(
  id: number,
  data: CreateWorkoutPlanRequest
): Promise<WorkoutPlan> {
  const response = await api.put<WorkoutPlan>(
    `${WORKOUTS_ENDPOINT}/${id}`,
    data
  );

  return response.data;
}

/**
 * Deletes a workout plan by its identifier.
 */
export async function deleteWorkoutPlan(
  id: number
): Promise<void> {
  await api.delete(`${WORKOUTS_ENDPOINT}/${id}`);
}