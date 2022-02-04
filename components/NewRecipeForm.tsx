import { FormEvent, useState } from 'react'
import useFormArray from '../hooks/useFormArray'
import styles from './NewRecipeForm.module.css'
import RecipeObject from '../interfaces/recipe'
import { useRouter } from 'next/router'

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

const NewRecipeForm = ({
  recipe,
  edit = false,
}: {
  recipe?: RecipeObject
  edit?: boolean
}) => {
  const router = useRouter()
  const [
    ingredients,
    handleAddIngredient,
    handleIngredientChange,
    handleRemoveIngredient,
  ] = useFormArray({
    itemTemplate: newIngredient,
    init: recipe?.ingredients.map((ing) => {
      return {
        name: ing.name,
        unit: ing.unit,
        amount: ing.amount,
        errors: { name: null, amount: null, unit: null },
      }
    }),
  })
  const [steps, handleAddStep, handleStepChange, handleRemoveStep] =
    useFormArray({
      itemTemplate: newStep,
      init: recipe?.steps.map((step) => {
        return { name: step.name, errors: { name: null } }
      }),
    })
  const [name, setName] = useState(recipe?.name || '')
  const [prepTime, setPrepTime] = useState(recipe?.prepTime || '')
  const [cookTime, setCookTime] = useState(recipe?.cookTime || '')
  const [totalTime, setTotalTime] = useState(recipe?.totalTime || '')
  const [message, setMessage] = useState('')

  const deleteRecipe = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/recipes/${recipe?._id}`, {
        method: 'DELETE',
      })

      // Throw error with status code if fetch fails
      if (!res.ok) {
        throw new Error(`${res.status}`)
      }
      // Return to previous page
      router.back()
    } catch (error) {
      setMessage('Failed to delete recipe')
    }
  }

  const saveEditRecipe = async (e: FormEvent) => {
    e.preventDefault() // Don't redirect on submit
    const newRecipe: RecipeObject = {
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
    if (recipe) {
      // Include old id so a new one is not issued
      newRecipe._id = recipe._id
    }
    try {
      const res = await fetch(`/api/recipes/${recipe?._id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      })

      // Throw error with status code if fetch fails
      if (!res.ok) {
        throw new Error(`${res.status}`)
      }
      // Return to previous page
      router.back()
    } catch (error) {
      setMessage('Failed to edit recipe')
    }
  }

  const saveNewRecipe = async (e: FormEvent) => {
    e.preventDefault() // Don't redirect page on submit
    const newRecipe: RecipeObject = {
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
    try {
      const res = await fetch('/api/recipes/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      })

      // Throw error with status code if fetch fails
      if (!res.ok) {
        throw new Error(`${res.status}`)
      }

      // Return to homepage
      router.push('/')
    } catch (error) {
      setMessage('Failed to add recipe')
    }
  }

  return (
    <form
      onSubmit={(e) => (edit ? saveEditRecipe(e) : saveNewRecipe(e))}
      className={styles.form}
    >
      <p className={`${styles.error} ${message ? styles.active : ''}`}>
        {message}
      </p>
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
                      ? `${styles.input} ${styles.amount} ${styles.error}`
                      : `${styles.input} ${styles.amount}`
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
              <div className={`${styles.col} ${styles.flexGrow}`}>
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
      <input type="submit" value={edit ? 'Edit Recipe' : 'Save Recipe'} />
      {edit && (
        <button onClick={deleteRecipe} className={styles.delete}>
          Delete Recipe
        </button>
      )}
    </form>
  )
}

export default NewRecipeForm
