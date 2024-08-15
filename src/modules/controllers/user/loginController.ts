import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { loginUserUseCase } from '../../useCases/user/loginUserUseCase'

export async function loginController(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const loginUserBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  })

  const { username, password } = loginUserBodySchema.parse(request.body)
  const response = await loginUserUseCase(username, password)
  return replay.status(200).send(response)
}
