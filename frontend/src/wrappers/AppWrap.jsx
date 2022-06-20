import { Footer, Navbar } from 'components'
import React from 'react'

const AppWrap =  ({children}) => {
  return (
    <>
        <Navbar/>
            {children}
        <Footer/>
    </>
  )
}

export default AppWrap