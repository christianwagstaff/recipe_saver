import RecipeInterface from '../interfaces/recipe'
import styles from './Recipe.module.css'

const RecipePage = ({ recipe }: { recipe: RecipeInterface }) => {
  return (
    <>
      <h1>{recipe.name}</h1>
      <div className={styles.about}>
        {recipe.prepTime && (
          <div>
            <strong>Prep: </strong>
            {recipe.prepTime} mins
          </div>
        )}
        {recipe.cookTime && (
          <div>
            <strong>Cook: </strong>
            {recipe.cookTime} mins
          </div>
        )}
        {recipe.totalTime && (
          <div>
            <strong>Total: </strong>
            {recipe.totalTime} mins
          </div>
        )}
      </div>
    </>
  )
}

export default RecipePage
