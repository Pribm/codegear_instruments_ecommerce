import React from 'react'
import { Brands, Hero, Layout, Featured, Products } from '../components'

const index = () => {
  return (
      <Layout>
        <Hero/>
        <Products/>
        <Brands/>
      </Layout>
  )
}

export default index