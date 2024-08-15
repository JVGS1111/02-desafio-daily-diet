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
  const userId = request.id
  const meal = await getMealByIdUseCase(userId, id)

  return replay.status(200).send({
    meal,
  })
}
