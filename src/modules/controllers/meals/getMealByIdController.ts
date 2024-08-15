import { FastifyReply, FastifyRequest } from 'fastify'
import { getMealByIdUseCase } from '../../useCases/meal/getMealByIdUseCase'
import { z } from 'zod'
import { AppError } from '../../../config/errors/AppError'

export async function getMealByIdController(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const requestParamSchema = z.object({
    id: z.string(),
  })

  const { id } = requestParamSchema.parse(request.params)
  const meal = await getMealByIdUseCase(id)
  if (!meal) {
    throw new AppError('Meal not found', 404)
  }
  const userId = request.id
  if (userId !== meal.user_id) {
    throw new AppError('Meal not found', 404)
  }

  return replay.status(200).send({
    meal,
  })
}
