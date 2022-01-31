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
  if (results) {
    const recipes = results.map((recipe) => {
      // Change from Mongoose document to js object
      return JSON.parse(JSON.stringify(recipe))
    })
    return recipes
  } else {
    return []
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

export async function getRecipeData(id: string) {
  await connect()
  const results = await RecipeModel.findById(id).catch(errorCatcher)
  if (results) {
    // Change from Mongoose document to js object
    const recipe = JSON.parse(JSON.stringify(results))
    return {
      id,
      data: recipe,
    }
  } else {
    return {
      id,
      data: null,
    }
  }
}

function errorCatcher(error: Error) {
  console.log(error)
}
