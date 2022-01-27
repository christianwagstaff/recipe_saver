import { FormEvent, useState } from 'react'
import useFormArray from '../hooks/useFormArray'
// import { submitNewRecipe } from '../lib/recipies'
import styles from './NewRecipeForm.module.css'

interface Ingredient {
  name: string
  amount: number | string
  unit: string

  errors: {
    name: null | string
    amount: null | string
    unit: null | string
  }
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

const NewRecipeForm = () => {
  const [
    ingredients,
    handleAddIngredient,
    handleIngredientChange,
    handleRemoveIngredient,
  ] = useFormArray({ itemTemplate: newIngredient })
  const saveNewRecipe = (e: FormEvent) => {
    e.preventDefault() // Don't redirect page on submit
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
        />
      </label>
      <div className={styles.times}>
        <label htmlFor="prepTime" className={styles.input}>
          Prep Time
          <input
            id="prepTime"
            name="prepTime"
            type="number"
            required
            placeholder="Minutes"
            min={0}
          />
        </label>
        <label htmlFor="cookTIme" className={styles.input}>
          Cook Time
          <input
            id="cookTime"
            name="cookTime"
            type="number"
            required
            placeholder="Minutes"
            min={0}
          />
        </label>
        <label htmlFor="totalTime" className={styles.input}>
          Total Time
          <input
            id="totalTime"
            name="totalTime"
            type="number"
            required
            placeholder="Minutes"
            min={0}
          />
        </label>
      </div>
      <label htmlFor="ingredient-list" className={styles.ingredientList}>
        Ingredients
        {ingredients.map((ingredient, index) => {
          return (
            <div className={styles.ingredient}>
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
    </form>
  )
}

export default NewRecipeForm
