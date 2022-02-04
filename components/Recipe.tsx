import RecipeInterface from '../interfaces/recipe'
import styles from './Recipe.module.css'
import utilStyles from '../styles/utils.module.css'
import { useState } from 'react'

const RecipePage = ({ recipe }: { recipe: RecipeInterface }) => {
  const [currentYield, setCurrentYield] = useState(1)
  function decrementYield() {
    // Don't allow zero or negative yields
    if (currentYield === 1) {
      return
    }
    setCurrentYield(currentYield - 1)
  }
  function incrementYield() {
    setCurrentYield(currentYield + 1)
  }
  return (
    <>
      <h1>{recipe.name}</h1>
      <div className={styles.about}>
        {recipe.prepTime && (
          <div>
            <strong>Prep: </strong>
            {recipe.prepTime}{' '}
            {recipe.prepTime && recipe.prepTime > 1 ? 'mins' : 'min'}
          </div>
        )}
        <div>
          <strong>Cook: </strong>
          {recipe.cookTime}{' '}
          {recipe.cookTime && recipe.cookTime > 1 ? 'mins' : 'min'}
        </div>
        {recipe.totalTime && (
          <div>
            <strong>Total: </strong>
            {recipe.totalTime}{' '}
            {recipe.totalTime && recipe.totalTime > 1 ? 'mins' : 'min'}
          </div>
        )}
      </div>
      <div className={`${styles.about} ${styles.noBorder}`}>
        <h2>Ingredients</h2>
        <div className={`${styles.yield} ${utilStyles.borderCircle}`}>
          <button onClick={() => decrementYield()}>-</button>
          <span>{currentYield}</span>
          <button onClick={() => incrementYield()}>+</button>
        </div>
        <ul className={`${styles.list} ${styles.ingredients}`}>
          {recipe.ingredients.map((ing, index) => {
            return (
              <li
                key={index}
                className={`${utilStyles.list} ${styles.listItem}`}
              >
                <input type="checkbox" />
                <p>
                  {`${ing.amount * currentYield} ${ing.unit}${
                    ing.amount * currentYield > 1 && ing.unit === 'cup'
                      ? 's'
                      : ''
                  } `}
                  <strong>{ing.name}</strong>
                </p>
              </li>
            )
          })}
        </ul>
      </div>
      <div className={`${styles.about} ${styles.noBorder}`}>
        <h2>Instuctions</h2>
        <ol className={styles.list}>
          {recipe.steps.map((step, index) => {
            return (
              <li key={index}>
                <span>{step.name}</span>
              </li>
            )
          })}
        </ol>
      </div>
    </>
  )
}

export default RecipePage
