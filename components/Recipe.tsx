import RecipeInterface from '../interfaces/recipe'
import styles from './Recipe.module.css'
import utilStyles from '../styles/utils.module.css'

const RecipePage = ({ recipe }: { recipe: RecipeInterface }) => {
  return (
    <>
      <h1>{recipe.name}</h1>
      <div className={styles.about}>
        {recipe.prepTime && (
          <div>
            <strong>Prep: </strong>
            {recipe.prepTime} {recipe.prepTime > 1 ? 'mins' : 'min'}
          </div>
        )}
        {recipe.cookTime && (
          <div>
            <strong>Cook: </strong>
            {recipe.cookTime} {recipe.cookTime > 1 ? 'mins' : 'min'}
          </div>
        )}
        {recipe.totalTime && (
          <div>
            <strong>Total: </strong>
            {recipe.totalTime} {recipe.totalTime > 1 ? 'mins' : 'min'}
          </div>
        )}
      </div>
      <div className={`${styles.about} ${styles.noBorder}`}>
        <h2>Ingredients</h2>
        <ul className={`${styles.list} ${styles.ingredients}`}>
          {recipe.ingredients.map((ing, index) => {
            return (
              <li
                key={index}
                className={`${utilStyles.list} ${styles.listItem}`}
              >
                <input type="checkbox" />
                <p>
                  {`${ing.amount} ${ing.unit} `}
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
