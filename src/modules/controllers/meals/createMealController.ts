import { z } from 'zod'
import { checkValidDate } from '../../../utils/check-valid-date'
import { FastifyReply, FastifyRequest } from 'fastify'
import { createMealUseCase } from '../../useCases/meal/createMealUseCase'

export async function createMealController(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const createMealControllerBodySchema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    isWithinDiet: z.boolean(),
    mealTime: z.string(),
  })

  const { isWithinDiet, mealTime, name, description } =
    createMealControllerBodySchema.parse(request.body)

  const isValidDate = checkValidDate(mealTime)

  if (!isValidDate) {
    return replay.status(400).send({ message: 'Invalid date' })
  }

  await createMealUseCase({
    userId: request.id,
    isWithinDiet,
    mealTime: String(mealTime),
    name,
    description,
  })

  return replay.status(201).send()
}
