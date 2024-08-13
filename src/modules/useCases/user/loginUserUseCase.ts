import { AppError } from '../../../config/errors/AppError'
import { getUserByUsername } from '../../repositories/user/usersRepository'
import { checkPassword } from '../../../utils/check-password'
import { createJWT } from '../../../utils/create-jwt'

export async function loginUserUseCase(username: string, password: string) {
  const userExists = await getUserByUsername({ username })

  if (!userExists) {
    throw new AppError('username/password is invalid', 400)
  }

  const isPasswordCorrect = await checkPassword(password, userExists.password)

  if (!isPasswordCorrect) {
    throw new AppError('username/password is invalid', 400)
  }

  const token = createJWT(userExists.id)

  return {
    token,
    user_id: userExists.id,
  }
}
