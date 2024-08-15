import { FastifyReply, FastifyRequest } from 'fastify'
import { listAllUserMealsUseCase } from '../../useCases/meal/listAllUserMealsUseCase'

export async function listAllUserMealsController(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const userId = request.id!
  const list = await listAllUserMealsUseCase(userId)

  return replay.status(200).send({
    meals: list,
  })
}
