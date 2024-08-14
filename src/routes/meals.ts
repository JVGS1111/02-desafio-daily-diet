import { FastifyInstance } from 'fastify'
import { ensureAuthentication } from '../middlewares/ensure-authentication'
import { createMealController } from '../modules/controllers/mealsControllers'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: [ensureAuthentication] }, createMealController)
}
