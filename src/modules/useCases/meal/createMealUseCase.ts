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
  await createMeal({
    description,
    isWithinDiet,
    mealTime,
    name,
    userId,
  })
}
