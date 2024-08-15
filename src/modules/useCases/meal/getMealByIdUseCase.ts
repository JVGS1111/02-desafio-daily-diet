import { AppError } from '../../../config/errors/AppError'
import { getMealById } from '../../repositories/meals/meals'

export async function getMealByIdUseCase(userId: string, id: string) {
  const meal = await getMealById({ id })
  if (!meal) {
    throw new AppError('Meal not found', 404)
  }

  if (userId !== meal.user_id) {
    throw new AppError('Meal not found', 404)
  }

  return meal
}
