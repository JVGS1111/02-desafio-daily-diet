import { AppError } from '../../../config/errors/AppError'
import { checkValidDate } from '../../../utils/check-valid-date'
import { createMeal } from '../../repositories/meals/meals'

interface CreateMealUseCaseProps {
  userId: string
  isWithinDiet: boolean
  mealTime: string
  name: string
  description?: string | null
}

export async function createMealUseCase({
  userId,
  description,
  isWithinDiet,
  mealTime,
  name,
}: CreateMealUseCaseProps) {
  const isValidDate = checkValidDate(mealTime)

  if (!isValidDate) {
    throw new AppError('Invalid date', 400)
  }
  await createMeal({
    description,
    isWithinDiet,
    mealTime,
    name,
    userId,
  })
}
