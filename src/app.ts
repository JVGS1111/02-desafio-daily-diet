import fastify from 'fastify'
import { userRoutes } from './routes/user'
import { errorHandler } from './config/errors/errorHandler'

const app = fastify()

app.register(userRoutes, {
  prefix: 'user',
})

app.setErrorHandler(errorHandler)

export default app
