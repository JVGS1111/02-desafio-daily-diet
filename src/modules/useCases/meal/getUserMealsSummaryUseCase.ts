import { getUserMealsSummary } from '../../repositories/meals/meals'

export async function getUserMealsSummaryUseCase(userId: string) {
  const summary = await getUserMealsSummary({ userId })

  return summary
}
