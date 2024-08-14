export interface GetMealByIdDTO {
  id: string
}

export interface ListUserMealsDTO {
  userId: string
}

export interface DeleteMealByIdDTO {
  id: string
}

export interface PatchMealDTO {
  id: string
  name?: string
  description?: string
  isWithinDiet?: boolean
  mealTime?: string
}

export interface CreateMealDTO {
  userId: string
  name: string
  description?: string | null
  isWithinDiet: boolean
  mealTime: string
}
