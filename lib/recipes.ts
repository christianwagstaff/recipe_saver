import connect from '../middleware/mongodb'
import RecipeModel from '../models/Recipe'
import { Types } from 'mongoose'
import RecipeInterface from '../interfaces/recipe'

export async function submitNewRecipe(recipe: RecipeInterface) {
  await connect()
  const newRecipe = new RecipeModel(recipe)
  const results = await newRecipe.save()
  return results
}

export async function getAllRecipies() {
  await connect()
  const results = await RecipeModel.find({}).catch(errorCatcher)
  console.log(results)
  if (!results) {
    return []
  } else {
    return results
  }
}

export function getAllRecipeIds() {
  // const recipes = getLocalStorage('recipes')
  const recipes: RecipeInterface[] = []
  return recipes.map((recipe: RecipeInterface) => {
    return {
      params: {
        id: recipe._id,
      },
    }
  })
}

export async function getRecipeData(id: Types.ObjectId) {
  // const recipes: RecipeInterface[] = getLocalStorage('recipes')
  const recipes: RecipeInterface[] = []
  return {
    id,
    data: recipes.filter((recipe) => recipe._id === id),
  }
}

function errorCatcher(error: Error) {
  console.log(error)
}
