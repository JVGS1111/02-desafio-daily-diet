/* eslint-disable camelcase */
import { knex } from '../../../config/database'
import { Meal } from '../../../models/Meal'
import {
  CreateMealDTO,
  DeleteMealByIdDTO,
  GetMealByIdDTO,
  GetUserMealsSummaryDTO,
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

export async function getUserMealsSummary({ userId }: GetUserMealsSummaryDTO) {
  const numberOfMeals = await knex('meals')
    .count<Record<string, number>>('*', { as: 'total' })
    .where('user_id', userId)
    .first()
  const numberOfMealsWithinDiet = await knex('meals')
    .count<Record<string, number>>('*', { as: 'total' })
    .where({
      user_id: userId,
      is_within_diet: true,
    })
    .first()
  const numberOfMealsOffDiet = await knex('meals')
    .count<Record<string, number>>('*', { as: 'total' })
    .where({
      user_id: userId,
      is_within_diet: false,
    })
    .first()

  const allMeals = await knex('meals').select().where({
    user_id: userId,
  })
  console.log(allMeals)

  const bestStreak = _getDietStreak(allMeals)

  const summary = {
    total: numberOfMeals!.total,
    withinDiet: numberOfMealsWithinDiet!.total,
    offDiet: numberOfMealsOffDiet!.total,
    bestStreak,
  }

  return summary
}

function _getDietStreak(meals?: Meal[]) {
  if (!meals || meals.length === 0) {
    return 0
  }
  let currentRecord = 0
  let consecutiveDays = 0

  meals.forEach((meal) => {
    if (meal.is_within_diet) {
      if (consecutiveDays === currentRecord) {
        consecutiveDays = consecutiveDays + 1
        currentRecord = consecutiveDays
      } else {
        consecutiveDays = consecutiveDays + 1
      }
    } else {
      consecutiveDays = 0
    }
  })

  return currentRecord
}
