import Recipe from '../../interfaces/recipe'
import Link from 'next/link'
import Layout from '../../components/layout'
import { getAllRecipies } from '../../lib/recipes'

// Define component Props
interface IndexProps {
  recipes: Array<Recipe>
}

// Define page components
function Index(props: IndexProps) {
  const { recipes } = props

  return (
    <Layout>
      <h1>Recipes</h1>
      <h2>Click on each Recipe to see it individually</h2>
      {recipes.map((recipe, index) => (
        <div key={index}>
          <Link href={`/recipes/${recipe._id}`}>
            <h3>{recipe.name}</h3>
          </Link>
        </div>
      ))}
    </Layout>
  )
}

// Get props for server side rendering
export async function getServerSideProps() {
  const recipes = await getAllRecipies()
  return {
    props: { recipes },
  }
}

export default Index
