import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
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

  await deleteMealUseCase(userId, id)

  return replay.status(204).send()
}
