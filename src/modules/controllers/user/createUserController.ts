import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { createUserUserCase } from '../../useCases/user/createUserUseCase'

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
