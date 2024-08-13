import { FastifyReply, FastifyRequest } from 'fastify'
import { verify } from 'jsonwebtoken'
import { env } from '../config/env'
import { AppError } from '../config/errors/AppError'

export async function ensureAuthentication(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    return replay.status(401).send({
      message: 'Unauthorized',
    })
  }
  const [, token] = authHeader.split(' ')
  try {
    const { sub: userId } = verify(token, env.JWT_SECRET)
    request.id = userId as string
  } catch (error) {
    throw new AppError('Unauthorized', 401)
  }
}
