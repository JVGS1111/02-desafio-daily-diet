import { FastifyInstance } from 'fastify'
import { ensureAuthentication } from '../middlewares/ensure-authentication'
import {
  createMealController,
  getMealByIdController,
  listAllUserMealsController,
} from '../modules/controllers/mealsControllers'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: [ensureAuthentication] }, createMealController)
  app.get(
    '/',
    { preHandler: [ensureAuthentication] },
    listAllUserMealsController,
  )
  app.get('/:id', { preHandler: [ensureAuthentication] }, getMealByIdController)
}
