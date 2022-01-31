import { GetServerSideProps } from 'next'
import Layout from '../../../components/layout'
import RecipeInterface from '../../../interfaces/recipe'
import Head from 'next/head'
import utilStyles from '../../../styles/utils.module.css'
import connect from '../../../middleware/mongodb'
import RecipeModel from '../../../models/Recipe'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) {
    return { props: { recipe: null } }
  }
  const id = params['id'] as string
  await connect()
  const recipe = await RecipeModel.findById(id).lean()
  recipe._id = recipe._id.toString()
  return { props: { recipe } }
}

export default function Recipe({
  recipeData,
}: {
  recipeData: RecipeInterface
}) {
  return (
    <Layout>
      <Head>
        <title>{recipeData.name}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{recipeData.name}</h1>
    </Layout>
  )
}
