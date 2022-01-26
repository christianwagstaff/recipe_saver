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
  const isMobile = useWidowWidth(600)

  // TODO - BUG - nav flashes false for a fraction of a second
  return (
    <nav className={styles.nav}>
      {isMobile && (
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
      )}
      {isMobile && toggleMenu && (
        <div className={styles.dropdown}>
          <ul className={styles.navList}>
            <li>
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
            <NavLink url="/" name="Home" router={router} />
            <NavLink
              url="/recipies/new"
              name="Create Recipie"
              router={router}
            />
          </ul>
        </div>
      )}
      {!isMobile && (
        <ul className={styles.navList}>
          <NavLink url="/" name="Home" router={router} />
          <NavLink url="/recipies/new" name="Create Recipie" router={router} />
        </ul>
      )}
    </nav>
  )
}
