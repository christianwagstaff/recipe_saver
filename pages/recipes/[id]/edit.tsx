import Layout from '../../../components/layout'
import NewRecipeForm from '../../../components/NewRecipeForm'
import { GetServerSideProps } from 'next'
import { getRecipeData } from '../../../lib/recipes'
import RecipeInterface from '../../../interfaces/recipe'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) {
    return { props: { recipe: null } }
  }
  const id = params['id'] as string
  const recipe = await getRecipeData(id)
  return { props: { recipe: recipe.data } }
}

export default function NewRecipe({ recipe }: { recipe: RecipeInterface }) {
  return (
    <Layout>
      <h1>Create a New Recipe</h1>
      <NewRecipeForm edit={true} recipe={recipe} />
    </Layout>
  )
}
