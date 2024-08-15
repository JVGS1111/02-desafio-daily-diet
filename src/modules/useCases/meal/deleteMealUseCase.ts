import { AppError } from '../../../config/errors/AppError'
import { deleteMealById } from '../../repositories/meals/meals'
import { getMealByIdUseCase } from './getMealByIdUseCase'

export async function deleteMealUseCase(userId: string, id: string) {
  const meal = await getMealByIdUseCase(id)
  if (!meal || meal.user_id !== userId) {
    throw new AppError('Meal not found', 404)
  }
  await deleteMealById({ id })
  return true
}
