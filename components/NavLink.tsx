import Link from 'next/link'
import { NextRouter } from 'next/router'
import styles from './nav.module.css'

function NavLink({
  url,
  name,
  router,
}: {
  url: string
  name: string
  router: NextRouter
}) {
  return (
    <li
      className={`${styles.navListItem} ${
        router.pathname == url ? styles.active : ''
      }`}
    >
      <Link href={url}>
        <a>{name}</a>
      </Link>
    </li>
  )
}

export default NavLink
