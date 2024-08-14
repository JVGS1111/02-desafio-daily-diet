import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { createMealUseCase } from '../useCases/meal/createMealUseCase'
import { checkValidDate } from '../../utils/check-valid-date'
import { listAllUserMealsUseCase } from '../useCases/meal/listAllUserMealsUseCase'
import { getMealByIdUseCase } from '../useCases/meal/getMealByIdUseCase'
import { AppError } from '../../config/errors/AppError'
import { deleteMealUseCase } from '../useCases/meal/deleteMealUseCase'

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
