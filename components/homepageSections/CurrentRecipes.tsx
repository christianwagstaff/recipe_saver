import Link from 'next/link'
import utilStyles from '../../styles/utils.module.css'
import styles from './homepage.module.css'
import Recipe from '../../interfaces/recipe'

const CurrentRecipes = ({ recipes }: { recipes: Recipe[] }) => {
  // Get Current Recipe count from local storage
  return (
    <section
      className={`${utilStyles.lightBackground} ${styles.section}`}
    >
      <h2>Recipe Count</h2>
      {recipes.length === 0 && (
        <p>
          You have no saved recipes!{' '}
          <Link href="/recipes/new">
            <a>Click here</a>
          </Link>{' '}
          to start your first recipe!
        </p>
      )}
      {recipes.length > 0 && (
        <p>
          You currently you have {recipes.length}{' '}
          {recipes.length === 1 ? 'recipe' : 'recipies'} created!
        </p>
      )}
      {recipes.length > 0 && (
        <ul className={`${utilStyles.list} ${styles.list}`}>
          {[...recipes.slice(0, 5)].map((recipe, index) => {
            return (
              <li key={index} className={styles.recipe}>
                <Link href={`/recipes/${recipe._id}`}>
                  <a>{`${recipe.name}`}</a>
                </Link>{' '}
              </li>
            )
          })}
          <li className={`${styles.recipe} ${styles.all}`}>
            <Link href={`/recipes`}>
              <a>
                <strong>See All Recipes</strong>
              </a>
            </Link>{' '}
          </li>
        </ul>
      )}
    </section>
  )
}

export default CurrentRecipes
