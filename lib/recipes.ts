import { getLocalStorage, setLocalStorage } from '../hooks/useLocalStorage'

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
  const currentRecipies = getLocalStorage('recipes')
  if (currentRecipies) {
    setLocalStorage('recipes', [recipe, ...currentRecipies])
  } else {
    setLocalStorage('recipes', [recipe])
  }
}

export function getAllRecipies() {
  const recipies = getLocalStorage('recipes')
  if (recipies === null) {
    return []
  } else {
    return recipies
  }
}

export function getAllRecipeIds() {
  const recipes = getLocalStorage('recipes')
  return recipes.map((recipe: Recipe) => {
    return {
      params: {
        id: recipe.id,
      },
    }
  })
}

export async function getRecipeData(id: string | null) {
  const recipes: Recipe[] = getLocalStorage('recipes')
  return {
    id,
    data: recipes.filter((recipe) => recipe.id === id),
  }
}
