import { GetServerSideProps } from 'next'
import Layout from '../../../components/layout'
import RecipeInterface from '../../../interfaces/recipe'
import Head from 'next/head'
import { getRecipeData } from '../../../lib/recipes'
import RecipeCard from '../../../components/RecipeCard'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) {
    return { props: { recipe: null } }
  }
  const id = params['id'] as string
  const recipe = await getRecipeData(id)
  return { props: { recipe: recipe.data } }
}

export default function Recipe({ recipe }: { recipe: RecipeInterface }) {
  return (
    <Layout>
      <Head>
        <title>{recipe.name}</title>
      </Head>
      <RecipeCard recipe={recipe} />
    </Layout>
  )
}
