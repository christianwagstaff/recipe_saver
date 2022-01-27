import { FormEvent, useState } from 'react'
// import { submitNewRecipe } from '../lib/recipies'
import FormInput from './FormInput'
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

const NewRecipeForm = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const saveNewRecipe = (e: FormEvent) => {
    e.preventDefault() // Don't redirect page on submit
  }
  const handleRemoveIngredient = (e: FormEvent, index: number) => {
    e.preventDefault()
    setIngredients((prev) => prev.filter((item) => item !== prev[index]))
  }
  const prevIsValid = () => {
    if (ingredients.length === 0) {
      return true
    }
    const someEmpty = ingredients.some(
      (i) => i.amount === '' || i.name === '' || i.unit === ''
    )

    if (someEmpty) {
      ingredients.map((item, index) => {
        const allPrev = [...ingredients]

        if (ingredients[index].name === '') {
          allPrev[index].errors.name = 'Name is Required'
        }
        if (ingredients[index].unit === '') {
          allPrev[index].errors.unit = 'Unit is Required'
        }
        if (ingredients[index].amount === '') {
          allPrev[index].errors.amount = 'Amount is Required'
        }

        setIngredients(allPrev)
      })
    }

    return !someEmpty
  }
  const handleAddIngredient = (e: FormEvent) => {
    e.preventDefault()
    const newIngredientState = {
      name: '',
      amount: '',
      unit: '',

      errors: {
        name: null,
        amount: null,
        unit: null,
      },
    }
    if (prevIsValid()) {
      setIngredients([...ingredients, newIngredientState])
    }
  }
  const handleIngredientChange = (e: any, index: number) => {
    e.preventDefault()
    setIngredients((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item
        } else {
          return {
            ...item,
            [e.target.name]: e.target.value,

            // Clear Errors when user inputs
            errors: {
              ...item.errors,
              [e.target.name]:
                e.target.value.length > 0
                  ? null
                  : `${e.target.name} is required`,
            },
          }
        }
      })
    })
  }

  return (
    <form onSubmit={saveNewRecipe} className={styles.form}>
      <FormInput
        id="name"
        type="text"
        label="Recipe Name"
        autoComplete="off"
        require={true}
        className={styles.input}
        placeholder="Recipe Name"
      />
      <div className={styles.times}>
        <FormInput
          id="prepTime"
          type="number"
          label="Prep Time"
          autoComplete="off"
          require={true}
          className={styles.input}
          placeholder="Minutes"
          min={0}
        />
        <FormInput
          id="cookTime"
          type="number"
          label="Cook Time"
          autoComplete="off"
          require={true}
          className={styles.input}
          placeholder="Minutes"
          min={0}
        />
        <FormInput
          id="totalTime"
          type="number"
          label="Total Time"
          autoComplete="off"
          require={true}
          className={styles.input}
          placeholder="Minutes"
          min={0}
        />
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
