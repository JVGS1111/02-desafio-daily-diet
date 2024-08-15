import { AppError } from '../../../config/errors/AppError'
import { checkValidDate } from '../../../utils/check-valid-date'
import { patchMeal } from '../../repositories/meals/meals'
import { PatchMealDTO } from '../../repositories/meals/MealsDTO'
import { getMealByIdUseCase } from './getMealByIdUseCase'

interface UpdateMealUseCaseProps extends PatchMealDTO {
  userId: string
}

export async function updateMealUseCase({
  userId,
  id,
  description,
  isWithinDiet,
  mealTime,
  name,
}: UpdateMealUseCaseProps) {
  if (mealTime !== undefined) {
    const isValidDate = checkValidDate(mealTime!)

    if (!isValidDate) {
      throw new AppError('Invalid date', 400)
    }
  }

  const meal = await getMealByIdUseCase(userId, id)
  if (!meal || meal.user_id !== userId) {
    throw new AppError('Meal not found', 404)
  }
  await patchMeal({
    id,
    description,
    isWithinDiet,
    mealTime,
    name,
  })
}
