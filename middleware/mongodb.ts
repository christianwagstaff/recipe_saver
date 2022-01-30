import mongoose from 'mongoose'

// CONNECTING TO MONGOOSE (get database url from .env.local)
const DATABASE_URL = process.env.DATABASE_URL

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch((err) => console.log(err))
  console.log('Mongoose Connection Established')

  // Recipe Model
  const RecipeModel =
    mongoose.models.RecipeModel || mongoose.model('RecipeModel', RecipeSchema)

  return { conn, RecipeModel }
}

const RecipeSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  ingredients: [
    {
      unit: { type: String },
      amount: { type: Number },
      name: { type: String },
    },
  ],
  steps: [{ name: { type: String } }],
  createdDate: { type: Date },
  tags: [{ type: String }],
  category: [{ type: String }],
  notes: [{ note: { type: String }, date: { type: Date } }],
  prepTime: { type: Number },
  cookTime: { type: Number },
  totalTime: { type: Number },
  rating: { type: String, enum: [1, 2, 3, 4, 5] },
})
