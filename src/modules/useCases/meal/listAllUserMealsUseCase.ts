import { listUserMeals } from '../../repositories/meals/meals'

export async function listAllUserMealsUseCase(userId: string) {
  const list = await listUserMeals({ userId })
  return list
}
