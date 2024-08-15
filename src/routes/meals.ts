/* eslint-disable prettier/prettier */
import { FastifyInstance } from 'fastify'
import { ensureAuthentication } from '../middlewares/ensure-authentication'
import { createMealController } from '../modules/controllers/meals/createMealController'
import { listAllUserMealsController } from '../modules/controllers/meals/listAllUserMealsController'
import { getMealByIdController } from '../modules/controllers/meals/getMealByIdController'
import { deleteMealController } from '../modules/controllers/meals/deleteMealController'
import { updateMealController } from '../modules/controllers/meals/updateMealController'
import { getUserMealsSummaryController } from '../modules/controllers/meals/getUserMealsSummaryController'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: [ensureAuthentication] }, createMealController)
  app.get('/', { preHandler: [ensureAuthentication] }, listAllUserMealsController)
  app.get('/:id', { preHandler: [ensureAuthentication] }, getMealByIdController)
  app.delete('/:id', { preHandler: [ensureAuthentication] }, deleteMealController)
  app.patch('/:id', { preHandler: [ensureAuthentication] }, updateMealController)
  app.get('/summary', { preHandler: [ensureAuthentication] }, getUserMealsSummaryController)
}
