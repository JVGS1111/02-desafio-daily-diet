import bcrypt from 'bcrypt'
export async function checkPassword(
  password: string,
  encryptedPassword: string,
) {
  const result = await bcrypt.compare(password, encryptedPassword)
  return result
}
