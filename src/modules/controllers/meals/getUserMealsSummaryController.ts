import { FastifyReply, FastifyRequest } from 'fastify'
import { getUserMealsSummaryUseCase } from '../../useCases/meal/getUserMealsSummaryUseCase'

export async function getUserMealsSummaryController(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const userId = request.id

  const summary = await getUserMealsSummaryUseCase(userId)
  return replay.status(200).send({
    summary,
  })
}
