import HomePage from '../components/Homepage'
import Layout from '../components/layout'
import Recipe from '../components/interfaces/recipe'
import { getAllRecipies } from '../lib/recipes'

export async function getServerSideProps() {
  const allRecipes = getAllRecipies()
  if (!allRecipes) {
    return {
      notFound: true,
    }
  }

  return {
    props: { recipes: allRecipes },
  }
}

const Home = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <Layout>
      <HomePage recipes={recipes} />
    </Layout>
  )
}

export default Home
