import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getAllRecipies } from '../../lib/recipes'
import utilStyles from '../../styles/utils.module.css'
import styles from './homepage.module.css'

const CurrentRecipes = () => {
  // Get Current Recipe count from local storage
  const [recipes, setRecipes] = useState([])
  useEffect(() => {
    setRecipes(getAllRecipies())
  }, [])
  return (
    <section className={`${utilStyles.width100} ${utilStyles.lightBackground} ${styles.section}`}>
      <h2>Recipe Count</h2>
      {recipes.length > 0 && (
        <p>Currently you have {recipes.length} recipes created!</p>
      )}
      {recipes.length === 0 && (
        <p>
          You have no saved recipes!{' '}
          <Link href="/recipes/new">
            <a>Click here</a>
          </Link>{' '}
          to start your first recipe!
        </p>
      )}
    </section>
  )
}

export default CurrentRecipes
