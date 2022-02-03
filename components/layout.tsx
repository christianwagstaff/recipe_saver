import Head from 'next/head'
import styles from './layout.module.css'
import React from 'react'
import Header from './header'

const name = 'Recipe Saver'
export const siteTitle = 'Recipe Saver'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Recipe Saver App where users can create, edit and delete their personal recipes."
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Recipe Saver</title>
      </Head>
      <Header name={name} />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <a
          href="https://github.com/christianwagstaff"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created By Christian Wagstaff
        </a>
      </footer>
    </div>
  )
}
