/* eslint-disable prettier/prettier */
import { FastifyInstance } from 'fastify'
import { ensureAuthentication } from '../middlewares/ensure-authentication'
import {
  createMealController,
  deleteMealController,
  getMealByIdController,
  listAllUserMealsController,
} from '../modules/controllers/mealsControllers'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: [ensureAuthentication] }, createMealController)
  app.get('/', { preHandler: [ensureAuthentication] }, listAllUserMealsController)
  app.get('/:id', { preHandler: [ensureAuthentication] }, getMealByIdController)
  app.delete('/:id', { preHandler: [ensureAuthentication] }, deleteMealController)
  
}
