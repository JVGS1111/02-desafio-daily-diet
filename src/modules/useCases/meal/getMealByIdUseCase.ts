import { getMealById } from '../../repositories/meals/meals'

export async function getMealByIdUseCase(id: string) {
  const meal = await getMealById({ id })
  return meal
}
