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
          <li key={index}>
            <Link href={`/recipes/${recipe._id}`} passHref>
              <a>{recipe.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default AllRecipes
