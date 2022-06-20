import React from 'react'
import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DrawerMenu from './Cart/DrawerMenu';

const Layout = ({children}) => {


  
  return (
    <>
        <DrawerMenu/>
        <header>
            <Navbar/>
        </header>
        <main className='main-container'>
            {children}
        </main>
        <footer>
            <Footer/>
        </footer>
        <ToastContainer />
    </>
  )
}

export default Layout