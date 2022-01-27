import { getLocalStorage, setLocalStorage } from '../hooks/useLocalStorage'

interface Recipe {
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
  return getLocalStorage('recipes')
}
