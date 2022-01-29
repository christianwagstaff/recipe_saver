export default interface Recipe {
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
