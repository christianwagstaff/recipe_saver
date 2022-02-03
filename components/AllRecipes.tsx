import Recipe from '../interfaces/recipe'
import Link from 'next/link'
import styles from './AllRecipes.module.css'

// Define component Props
interface IndexProps {
  recipes: Array<Recipe>
}

// Define page components
function AllRecipes(props: IndexProps) {
  const { recipes } = props

  return (
    <>
      <h1>Recipes</h1>
      <h2>Click on each Recipe to see it individually</h2>
      <ul className={styles.list}>
        {recipes.map((recipe, index) => (
          <li key={index} className={styles.recipe}>
            <Link href={`/recipes/${recipe._id}`} passHref>
              <a>{recipe.name}</a>
            </Link>
            <div className={styles.recipeAbout}>
              <p>Ingredient Count: {recipe.ingredients.length}</p>
              <p>Step Count: {recipe.steps.length}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default AllRecipes
