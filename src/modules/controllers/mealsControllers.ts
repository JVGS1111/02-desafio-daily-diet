import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { createMealUseCase } from '../useCases/meal/createMealUseCase'
import { checkValidDate } from '../../utils/check-valid-date'

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

export async function patchMealController(
  request: FastifyRequest,
  replay: FastifyReply,
) {}

export async function getMealByIdController(
  request: FastifyRequest,
  replay: FastifyReply,
) {}

export async function listAllUserMealsController(
  request: FastifyRequest,
  replay: FastifyReply,
) {}

export async function deleteUserMeal(
  request: FastifyRequest,
  replay: FastifyReply,
) {}
