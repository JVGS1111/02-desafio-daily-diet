import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from './AppError'

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  console.log(error)

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message })
  }
  return reply.status(500).send({ message: error.message })
}
