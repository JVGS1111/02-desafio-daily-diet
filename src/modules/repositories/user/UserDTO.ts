export interface CreateUserDTO {
  id: string
  username: string
  password: string
}

export interface GetUserByUsernameDTO {
  username: string
}
