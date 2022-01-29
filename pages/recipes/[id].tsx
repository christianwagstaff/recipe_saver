import { GetStaticPaths, GetStaticProps } from 'next'
import { useState, useEffect } from 'react'
import { getAllRecipeIds, getRecipeData } from '../../lib/recipes'
import Layout from '../../components/layout'
import RecipeInterface from '../../components/interfaces/recipe'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllRecipeIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params ? (params.id as string) : null
  // TODO - implement when connected to database API
  const recipeData = await getRecipeData(id)
  return {
    props: {
      recipeData,
    },
  }
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
