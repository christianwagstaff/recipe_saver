import mongoose from 'mongoose'
import Recipe from '../interfaces/recipe'

const RecipeSchema = new mongoose.Schema<Recipe>({
  name: { type: String },
  ingredients: [
    {
      unit: { type: String },
      amount: { type: Number },
      name: { type: String },
    },
  ],
  steps: [{ name: { type: String } }],
  serves: { type: Number },
  createdDate: { type: Date },
  tags: [{ type: String }],
  category: [{ type: String }],
  notes: [{ note: { type: String }, date: { type: Date } }],
  prepTime: { type: Number },
  cookTime: { type: Number },
  totalTime: { type: Number },
  rating: { type: String, enum: [1, 2, 3, 4, 5] },
})

export default mongoose.models.RecipeModel ||
  mongoose.model('RecipeModel', RecipeSchema)
