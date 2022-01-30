import { connect } from '../middleware/mongodb'

interface Recipe {
  id: string
  name: string
  ingredients: { name: string; amount: number; unit: string }[]
  steps: { name: string }[]
  createdDate: Date
  tags?: string[]
  category?: string[]
  notes?: { note: string; date: Date }[]
  prepTime?: number
  cookTime?: number
  totalTime?: number
  rating?: 0 | 1 | 2 | 3 | 4 | 5
}

export function submitNewRecipe(recipe: Recipe) {
  // TODO - Implement with backend for continuous storage
  // Save to local storage
  // const currentRecipies = getLocalStorage('recipes')
  // if (currentRecipies) {
  //   setLocalStorage('recipes', [recipe, ...currentRecipies])
  // } else {
  //   setLocalStorage('recipes', [recipe])
  // }
  return recipe
}

export async function getAllRecipies() {
  // const recipes = getLocalStorage('recipes')
  const { RecipeModel } = await connect()
  const results = await RecipeModel.find({}).catch(errorCatcher)
  if (!results) {
    return []
  } else {
    return results
  }
}

export function getAllRecipeIds() {
  // const recipes = getLocalStorage('recipes')
  const recipes: Recipe[] = []
  return recipes.map((recipe: Recipe) => {
    return {
      params: {
        id: recipe.id,
      },
    }
  })
}

export async function getRecipeData(id: string | null) {
  // const recipes: Recipe[] = getLocalStorage('recipes')
  const recipes: Recipe[] = []
  return {
    id,
    data: recipes.filter((recipe) => recipe.id === id),
  }
}

function errorCatcher(error: Error) {
  console.log(error)
}
