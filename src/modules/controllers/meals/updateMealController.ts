import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { checkValidDate } from '../../../utils/check-valid-date'
import { getMealByIdUseCase } from '../../useCases/meal/getMealByIdUseCase'
import { updateMealUseCase } from '../../useCases/meal/updateMealUseCase'
import { AppError } from '../../../config/errors/AppError'

export async function updateMealController(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const requestParamSchema = z.object({
    id: z.string(),
  })
  const updateMealControllerBodySchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().optional(),
    isWithinDiet: z.boolean().optional(),
    mealTime: z.string().optional(),
  })
  const { id } = requestParamSchema.parse(request.params)
  const { isWithinDiet, mealTime, name, description } =
    updateMealControllerBodySchema.parse(request.body)
  if (
    isWithinDiet === undefined &&
    mealTime === undefined &&
    name === undefined &&
    description === undefined
  ) {
    return replay.status(400).send({ message: 'No data informed' })
  }

  const userId = request.id!

  await updateMealUseCase({
    userId,
    id,
    isWithinDiet,
    mealTime,
    name,
    description,
  })

  return replay.status(204).send()
}
