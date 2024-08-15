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
  const isValidDate = checkValidDate(mealTime!)

  if (!isValidDate) {
    return replay.status(400).send({ message: 'Invalid date' })
  }

  const userId = request.id!
  const meal = await getMealByIdUseCase(id)
  if (!meal || meal.user_id !== userId) {
    throw new AppError('Meal not found', 404)
  }

  await updateMealUseCase({ id, isWithinDiet, mealTime, name, description })

  return replay.status(204).send()
}
