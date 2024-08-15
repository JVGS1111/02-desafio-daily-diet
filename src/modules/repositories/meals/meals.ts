/* eslint-disable camelcase */
import { knex } from '../../../config/database'
import { Meal } from '../../../models/Meal'
import {
  CreateMealDTO,
  DeleteMealByIdDTO,
  GetMealByIdDTO,
  ListUserMealsDTO,
  PatchMealDTO,
} from './MealsDTO'
import crypto from 'node:crypto'

export async function createMeal({
  description,
  isWithinDiet,
  mealTime,
  name,
  userId,
}: CreateMealDTO) {
  await knex('meals').insert({
    id: crypto.randomUUID(),
    description,
    name,
    user_id: userId,
    meal_time: mealTime,
    is_within_diet: isWithinDiet,
  })
}

export async function getMealById({ id }: GetMealByIdDTO) {
  const meal = await knex('meals').select().where('id', id).first()
  return meal
}

export async function listUserMeals({ userId }: ListUserMealsDTO) {
  const meals = await knex('meals').select().where('user_id', userId)
  return meals
}

export async function deleteMealById({ id }: DeleteMealByIdDTO) {
  await knex('meals').delete().where('id', id)
}

export async function patchMeal({
  id,
  description,
  isWithinDiet,
  mealTime,
  name,
}: PatchMealDTO) {
  const options: Meal = {}

  if (description) {
    options.description = description
  }
  if (isWithinDiet) {
    options.is_within_diet = isWithinDiet
  }
  if (mealTime) {
    options.meal_time = mealTime
  }
  if (name) {
    options.name = name
  }

  await knex('meals').update(options).where('id', id)
}
