import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { client } from '../../lib/client'
import styles from './Navbar.module.scss'
import {MdSearch, MdShoppingBag} from 'react-icons/md'
import  {HiMenu, HiXCircle} from 'react-icons/hi'
import { Spinner } from 'react-bootstrap'
import { useStateContext } from 'context/StateContext'
import Link from 'next/link'
import Image from 'next/image'

import {images} from '../../constants'

const NavLinks = ({ data }) => {
  return (
    data.map((item, i) => {
      return (
        <li
          key={item.title + i}
          className={`${styles.menu_item} ${item.subcategory?.length > 0 ? styles.has_sub_menu : ''}`}>
          <Link
          href={
            item.subcategory?.length > 0 ?
            '#'
            :
            {
              pathname: '/search',
              query: {
                result: item.title
              }
            }
          }>
            {item.title}
          </Link>
          <ul
            className={`${styles.sub_menu}`}>
            {item.subcategory && <NavLinks data={item.subcategory} />}
          </ul>
        </li>

      )
    })
  )
}

const Navbar = () => {

  const {seeTotalQuantities,showCart, setShowCart, isSearching} = useStateContext()

  const navbar = useRef(null)

  function toggleMenu() {
    setMobileMenuOpen(!isMobileMenuOpen)
    navbar.current.classList.toggle(styles.is_active);
  }

  const [navLinks, setNavLinks] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const[searchField, setSearchField] = useState('')

  useEffect(() => {
    const query = `*[_type == "category" && title == "Products"]{
      _id,
      _type,
      title,
      "subcategory": *[_type == "category" && references(^._id)]{
        title,
        slug,
        _id,
        "subcategory": *[_type == "category" && references(^._id)]{
          title,
          slug,
          _id,
          "subcategory": *[_type == "category" && references(^._id)]{
            title,
            slug,
            _id,
            "subcategory": *[_type == "category" && references(^._id)]{
              _id,
              title,
              slug,
            }
          }
        }
      }
    }`
    client.fetch(query)
      .then(data => {
        setNavLinks(data)
        setLoading(false)
      })
  }, [])


  return (
    <header className={styles.header}>
      <div className={styles.header__top+' container-fluid d-flex align-items-center bg-black'}>
        <div className="container py-3 d-flex flex-wrap justify-content-center align-items-center">
          <div className={styles.brand}>
            <Image src={images.logo} alt="Codegear Logo"/>
          </div>
          <div className={'ms-auto '+styles.header__top_searchbox}>
            <input type="text" placeholder='Search by the product name, brand or specs' onChange={e => setSearchField(e.target.value)}/>
            {isSearching ? 
            <div className={styles.header__top_searchbox_spinner}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
             : 
                <Link href={{
                  pathname: '/search',
                  query: {
                    result: searchField
                  }
                }}>
                  <a><MdSearch/></a>
                </Link>
              } 
          </div>

          <div className={styles.header__top_icons}>
            {isMobileMenuOpen && (
              <div className='me-auto' onClick={() => toggleMenu()}>
                <HiXCircle className='bg-danger text-white'/>
                <span className='text-danger fw-bold ms-2'>Close menu</span>
              </div>
            )}
            <div className={styles.header__top_icons_cart}>
              <MdShoppingBag onClick={() => setShowCart(!showCart)}/>
              <span>{seeTotalQuantities()}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.mobile_nav}>
          <a href="#" className={styles.open_menu} onClick={() => toggleMenu()}>
            <HiMenu size={50}/>
          </a>
        </div>

        <nav className={styles.navbar+' ms-auto me-auto'} ref={navbar}>
          <ul className={`${styles.menu}`}>
            <li className={styles.menu_item}>
              <Link href="/">Home</Link>
            </li>
            {!isLoading && <NavLinks data={navLinks[0].subcategory} toggleMenu={toggleMenu}/>}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar