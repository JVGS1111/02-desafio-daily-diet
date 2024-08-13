import { FastifyReply, FastifyRequest } from 'fastify'
import { createUserUserCase } from '../useCases/user/createUserUseCase'
import { z } from 'zod'
import { loginUserUseCase } from '../useCases/user/loginUserUseCase'

export async function createUserController(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const createUserBodySchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
  })

  const { password, username } = createUserBodySchema.parse(request.body)
  await createUserUserCase(username, password)
  return replay.status(200).send()
}

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
