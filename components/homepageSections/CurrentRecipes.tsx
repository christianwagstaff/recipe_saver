import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getAllRecipies } from '../../lib/recipes'
import utilStyles from '../../styles/utils.module.css'
import styles from './homepage.module.css'
import Recipe from '../interfaces/recipe'

const CurrentRecipes = () => {
  // Get Current Recipe count from local storage
  const [recipes, setRecipes] = useState<Recipe[]>([])
  useEffect(() => {
    setRecipes(getAllRecipies())
  }, [])
  return (
    <section
      className={`${utilStyles.width100} ${utilStyles.lightBackground} ${styles.section}`}
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
      {recipes.length > 0 &&
        [...recipes.slice(0, 5)].map((recipe, index) => {
          return (
            <div key={index}>
              <Link href={`/recipes/${recipe.id}`}>{`${recipe.name}`}</Link>{' '}
            </div>
          )
        })}
    </section>
  )
}

export default CurrentRecipes
