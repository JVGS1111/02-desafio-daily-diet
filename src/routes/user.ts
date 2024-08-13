import { FastifyInstance } from 'fastify'
import {
  createUserController,
  loginController,
} from '../modules/controllers/userControllers'

export async function userRoutes(app: FastifyInstance) {
  app.post('/', createUserController)
  app.post('/login', loginController)
}
