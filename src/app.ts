import fastify from 'fastify'
import { userRoutes } from './routes/user'
import { errorHandler } from './config/errors/errorHandler'
import { mealsRoutes } from './routes/meals'

const app = fastify()

app.register(userRoutes, {
  prefix: 'user',
})
app.register(mealsRoutes, {
  prefix: 'meals',
})

app.setErrorHandler(errorHandler)

export default app
