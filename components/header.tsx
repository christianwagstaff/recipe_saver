import Nav from './nav'
import utilStyles from '../styles/utils.module.css'
import styles from './header.module.css'

export default function Header({ name }: { name: string }) {
  return (
    <header className={styles.header}>
      <h1 className={utilStyles.heading2Xl}>{name}</h1>
      <Nav />
    </header>
  )
}
