import { AppError } from '../../../config/errors/AppError'
import bcrypt from 'bcrypt'
import {
  createUser,
  getUserByUsername,
} from '../../repositories/user/usersRepository'
import crypto from 'node:crypto'

export async function createUserUserCase(username: string, password: string) {
  const userExists = await getUserByUsername({ username })

  if (userExists) {
    throw new AppError('Username has already been taken')
  }

  const encryptedPassword = await bcrypt.hash(password, 8)

  await createUser({
    id: crypto.randomUUID(),
    password: encryptedPassword,
    username,
  })
}
