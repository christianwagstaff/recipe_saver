import Nav from './nav'
import utilStyles from '../styles/utils.module.css'
import styles from './header.module.css'

export default function Header({ name }: { name: string }) {
  return (
    <header className={styles.header}>
      <div className={utilStyles.heading2Xl}>{name}</div>
      <Nav />
    </header>
  )
}
