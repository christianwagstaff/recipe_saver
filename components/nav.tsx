import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Image from 'next/image'
import styles from './nav.module.css'
import Close from '../public/images/close.svg'
import Menu from '../public/images/menu.svg'
import NavLink from './NavLink'

export default function Nav() {
  const router = useRouter()
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <nav className={styles.nav}>
      <ul className={`${styles.navList} ${toggleMenu ? styles.mobile : ''}`}>
        <li className={styles.mobileNav}>
          <button
            className={styles.showHideNav}
            onClick={() => {
              setToggleMenu(!toggleMenu)
            }}
          >
            {toggleMenu ? (
              <Image src={Close} height={30} width={30} alt="Close Nav" />
            ) : (
              <Image src={Menu} height={30} width={30} alt="Open Nav" />
            )}
          </button>
        </li>
        <div className={styles.dropdown}>
          <NavLink url="/" name="Home" router={router} />
          <NavLink url="/recipes/new" name="Create Recipe" router={router} />
          <NavLink url="/recipes" name="View Recipies" router={router} />
        </div>
      </ul>
    </nav>
  )
}
