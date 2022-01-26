import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import React from 'react'
import Nav from './nav'
import Header from './header'

const name = 'Recipe Saver'
export const siteTitle = 'Recipe Saver'

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode
  home?: boolean
}) {
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
      </Head>
      <Header name={name} />
      <main className={styles.main}>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
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