import { FastifyInstance } from 'fastify'
import { createUserController } from '../modules/controllers/user/createUserController'
import { loginController } from '../modules/controllers/user/loginController'

export async function userRoutes(app: FastifyInstance) {
  app.post('/', createUserController)
  app.post('/login', loginController)
}
