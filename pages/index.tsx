import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Layout home>
      <h1>HomePage</h1>
    </Layout>
  )
}

export default Home
