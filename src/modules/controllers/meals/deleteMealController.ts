import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { getMealByIdUseCase } from '../../useCases/meal/getMealByIdUseCase'
import { AppError } from '../../../config/errors/AppError'
import { deleteMealUseCase } from '../../useCases/meal/deleteMealUseCase'

export async function deleteMealController(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const requestParamSchema = z.object({
    id: z.string(),
  })
  const { id } = requestParamSchema.parse(request.params)
  const userId = request.id!

  const meal = await getMealByIdUseCase(id)
  if (!meal || meal.user_id !== userId) {
    throw new AppError('Meal not found', 404)
  }
  await deleteMealUseCase(id)

  return replay.status(204).send()
}
