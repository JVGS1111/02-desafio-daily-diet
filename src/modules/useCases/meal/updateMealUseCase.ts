import { patchMeal } from '../../repositories/meals/meals'
import { PatchMealDTO } from '../../repositories/meals/MealsDTO'

interface UpdateMealUseCaseProps extends PatchMealDTO {}

export async function updateMealUseCase({
  id,
  description,
  isWithinDiet,
  mealTime,
  name,
}: UpdateMealUseCaseProps) {
  await patchMeal({
    id,
    description,
    isWithinDiet,
    mealTime,
    name,
  })
}
