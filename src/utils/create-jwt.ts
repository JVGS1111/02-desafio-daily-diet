import { sign } from 'jsonwebtoken'
import { env } from '../config/env'

export function createJWT(id: string) {
  const token = sign({}, env.JWT_SECRET, {
    expiresIn: '1d',
    subject: id,
  })

  return token
}
