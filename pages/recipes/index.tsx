import Recipe from '../../interfaces/recipe'
import Layout from '../../components/layout'
import { getAllRecipies } from '../../lib/recipes'
import AllRecipes from '../../components/AllRecipes'

// Define component Props
interface IndexProps {
  recipes: Array<Recipe>
}

// Get props for server side rendering
export async function getServerSideProps() {
  const recipes = await getAllRecipies()
  return {
    props: { recipes },
  }
}

// Define page components
function Index(props: IndexProps) {
  const { recipes } = props

  return (
    <Layout>
      <AllRecipes recipes={recipes} />
    </Layout>
  )
}

export default Index
