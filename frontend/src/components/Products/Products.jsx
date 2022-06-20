import React, { useState, useEffect } from 'react'

import { client } from 'lib/client'

import styles from './Products.module.scss'
import Product from 'components/Product/Product'

const Products = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const query = `
        *[_type == "product"] | order(_createdAt desc)  [0...10]
        {
            "products": [defaultProductVariant, ...variants]{
                ...,
          "mainName": ^.title,
          "blurb" : ^.blurb,
          "_id" : ^._id,
          "slug": ^.slug.current,
          "discount": ^.discount,
          "details":[details[]->][0]
            },
        }
        `
        client.fetch(query).then(data => {
            let result = []
            data.forEach(d => {
                d.products.forEach(product => {
                    result.push(product)
                })
            })

            setProducts(result)
        })
    }, [])

    return (
        <section className={styles.products}>
            <div className="container mt-4">
                <h2 className='text-center'>Products</h2>
                <div className='d-flex flex-wrap justify-content-around p-4'>
                    {products?.map((product, i) => {
                        return <Product product={product} key={product.title+i+'a'}/>
                    })}
                </div>
            </div>
        </section>
    )
}

export default Products