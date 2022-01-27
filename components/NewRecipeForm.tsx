import { FormEvent, useState } from 'react'
import useFormArray from '../hooks/useFormArray'
import { submitNewRecipe } from '../lib/recipes'
import styles from './NewRecipeForm.module.css'

interface RecipeObject {
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

const newIngredient = {
  name: '',
  amount: '',
  unit: '',

  errors: {
    name: null,
    amount: null,
    unit: null,
  },
}

const newStep = {
  name: '',
  errors: { name: null },
}

const NewRecipeForm = () => {
  const [
    ingredients,
    handleAddIngredient,
    handleIngredientChange,
    handleRemoveIngredient,
  ] = useFormArray({ itemTemplate: newIngredient })
  const [steps, handleAddStep, handleStepChange, handleRemoveStep] =
    useFormArray({ itemTemplate: newStep })
  const [name, setName] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [cookTime, setCookTime] = useState('')
  const [totalTime, setTotalTime] = useState('')

  const saveNewRecipe = (e: FormEvent) => {
    e.preventDefault() // Don't redirect page on submit
    let newRecipe: RecipeObject = {
      name,
      ingredients: ingredients.map((ing) => {
        return {
          name: ing.name,
          amount: ing.amount,
          unit: ing.unit,
        }
      }),
      steps: steps.map((step) => {
        return { name: step.name }
      }),
      createdDate: new Date(),
      prepTime: Number(prepTime),
      cookTime: Number(cookTime),
      totalTime: Number(totalTime),
    }
    submitNewRecipe(newRecipe)
    console.log('Recipe Saved')
  }

  return (
    <form onSubmit={saveNewRecipe} className={styles.form}>
      <label htmlFor="name" className={styles.input}>
        Recipe Name
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Recipe Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
      </label>
      <div className={styles.times}>
        <label htmlFor="prepTime" className={styles.input}>
          Prep Time
          <input
            id="prepTime"
            name="prepTime"
            type="number"
            placeholder="Minutes"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            min={0}
          />
        </label>
        <label htmlFor="cookTIme" className={styles.input}>
          Cook Time
          <input
            id="cookTime"
            name="cookTime"
            type="number"
            placeholder="Minutes"
            min={0}
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
          />
        </label>
        <label htmlFor="totalTime" className={styles.input}>
          Total Time
          <input
            id="totalTime"
            name="totalTime"
            type="number"
            placeholder="Minutes"
            min={0}
            value={totalTime}
            onChange={(e) => setTotalTime(e.target.value)}
          />
        </label>
      </div>
      <label htmlFor="ingredient-list" className={styles.ingredientList}>
        Ingredients
        {ingredients.map((ingredient, index) => {
          return (
            <div className={styles.ingredient} key={index}>
              <div className={styles.col}>
                <input
                  type="number"
                  placeholder="Amount"
                  className={
                    ingredient.errors.amount
                      ? `${styles.input} ${styles.error}`
                      : styles.input
                  }
                  name="amount"
                  value={ingredient.amount}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
                {ingredient.errors.amount && (
                  <div className={styles.invalidInput}>Amount is required</div>
                )}
              </div>
              <div className={styles.col}>
                <select
                  name="unit"
                  className={
                    ingredient.errors.unit
                      ? `${styles.input} ${styles.error}`
                      : styles.input
                  }
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(e, index)}
                >
                  <option value=""></option>
                  <option value="cup">cup</option>
                  <option value="oz">oz</option>
                  <option value="g">gram</option>
                  <option value="tsp">tsp</option>
                  <option value="tbsp">tbsp</option>
                </select>
                {ingredient.errors.unit && (
                  <div className={styles.invalidInput}>Required</div>
                )}
              </div>
              <div className={styles.col}>
                <input
                  type="text"
                  name="name"
                  placeholder="Ingredient Name"
                  className={
                    ingredient.errors.name
                      ? `${styles.input} ${styles.error}`
                      : styles.input
                  }
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(e, index)}
                />{' '}
                {ingredient.errors.name && (
                  <div className={styles.invalidInput}>Name is required</div>
                )}
              </div>

              <button
                onClick={(e) => handleRemoveIngredient(e, index)}
                className={styles.remove}
              >
                X
              </button>
            </div>
          )
        })}
        <button onClick={handleAddIngredient}>Add Ingredient</button>
      </label>
      <label htmlFor="step-list" className={styles.ingredientList}>
        Steps
        <ol className={styles.list}>
          {steps.map((step, index) => {
            return (
              <li key={index}>
                <label htmlFor={`step${index}`} className={styles.horizontal}>
                  <div className={styles.input}>
                    <textarea
                      name="name"
                      id={`step${index}`}
                      className={
                        step.errors.name
                          ? `${styles.textarea} ${styles.error}`
                          : styles.textarea
                      }
                      value={step.name}
                      placeholder="Add New Step"
                      onChange={(e) => handleStepChange(e, index)}
                    />
                    {step.errors.name && (
                      <div className={styles.invalidInput}>
                        Step is required
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleRemoveStep(e, index)}
                    className={styles.remove}
                  >
                    X
                  </button>
                </label>
              </li>
            )
          })}
        </ol>
        <button onClick={handleAddStep}>Add Step</button>
      </label>
      <input type="submit" value="Save Recipe" />
    </form>
  )
}

export default NewRecipeForm
