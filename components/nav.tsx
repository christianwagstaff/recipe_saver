import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './nav.module.css'
import Close from '../public/images/close.svg'
import Menu from '../public/images/menu.svg'
import useWidowWidth from '../hooks/useWindowWidth'
import NavLink from './NavLink'

export default function Nav() {
  const router = useRouter()
  const [toggleMenu, setToggleMenu] = useState(false)

  // TODO - BUG - nav flashes false for a fraction of a second
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
              <Image src={Close} height={30} width={30} />
            ) : (
              <Image src={Menu} height={30} width={30} />
            )}
          </button>
        </li>
        <div className={styles.dropdown}>
          <NavLink url="/" name="Home" router={router} />
          <NavLink url="/recipes/new" name="Create Recipie" router={router} />
        </div>
      </ul>
    </nav>
  )
}
