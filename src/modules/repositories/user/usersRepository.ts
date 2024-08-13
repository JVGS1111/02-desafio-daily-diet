import { knex } from '../../../config/database'
import { CreateUserDTO, GetUserByUsernameDTO } from './UserDTO'

export async function createUser({ id, password, username }: CreateUserDTO) {
  await knex('users').insert({
    id,
    username,
    password,
  })
}

export async function getUserByUsername({ username }: GetUserByUsernameDTO) {
  const user = await knex('users').select().where('username', username).first()

  return user
}
