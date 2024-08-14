import { deleteMealById } from '../../repositories/meals/meals'

export async function deleteMealUseCase(id: string) {
  await deleteMealById({ id })
  return true
}
