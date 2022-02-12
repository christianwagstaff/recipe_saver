import RecipeInterface from '../interfaces/recipe'
import styles from './RecipeCard.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

const RecipeCard = ({ recipe }: { recipe: RecipeInterface }) => {
  const router = useRouter()
  return (
    <>
      <div className={styles.top}>
        <Link href={`${router.asPath.slice(0, -5)}/edit`}>
          <a className={styles.edit}>Edit</a>
        </Link>
      </div>
      <div className={styles.recipeCard}>
        <div className={styles.recipeCard_top}>
          <p className={styles.recipeTitle}>Recipe</p>
          <h1 className={styles.name}>{recipe.name}</h1>
        </div>
        <div className={styles.recipeCard_bottom}>
          <div className={styles.ingredientList}>
            <h2>Ingredients</h2>
            <ul className={`${styles.list} ${styles.ingredients}`}>
              {recipe.ingredients.map((ing, index) => {
                return (
                  <li
                    key={index}
                    className={`${utilStyles.list} ${styles.listItem}`}
                  >
                    <p>
                      {`${ing.amount} ${ing.unit}${
                        ing.amount > 1 && ing.unit === 'cup' ? 's' : ''
                      } `}
                      <strong>{ing.name}</strong>
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className={styles.recipeCard_right}>
            <div className={styles.about}>
              <div>
                <strong>Serves: </strong>
                {recipe.serves}
              </div>
              <div>
                <strong>Prep: </strong>
                {recipe.prepTime}{' '}
                {recipe.prepTime && recipe.prepTime > 1 ? 'mins' : 'min'}
              </div>
              <div>
                <strong>Cook: </strong>
                {recipe.cookTime}{' '}
                {recipe.cookTime && recipe.cookTime > 1 ? 'mins' : 'min'}
              </div>
              <div>
                <strong>Total: </strong>
                {recipe.totalTime}{' '}
                {recipe.totalTime && recipe.totalTime > 1 ? 'mins' : 'min'}
              </div>
            </div>
            <div className={styles.stepList}>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipeCard
