// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      username: string
      password: string
    }
    meals: {
      id: string
      name: string
      description: null | string
      user_id: string
      is_within_diet: boolean
      meal_time: string
      created_at?: string
      updated_at?: string
    }
  }
}
