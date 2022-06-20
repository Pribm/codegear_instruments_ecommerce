import React,{useState} from 'react'
import { client } from 'lib/client'
import { Layout } from '../../../components'
import styles from './Product.module.scss'

import { urlFor } from 'lib/client'

import { IoShareSocial } from 'react-icons/io5'
import { BsHeart } from 'react-icons/bs'
import ProductQuantity from 'components/ProductQuantity/ProductQuantity'
import { useStateContext } from 'context/StateContext'



const Product = ({ product }) => {

  const { increaseQty, decreaseQty, qty, addProduct} = useStateContext()

  const handleProductQuantity = value => value === 'inc' ? increaseQty() : decreaseQty()
  
  return (
    <Layout>
      <section id='product_details' className={styles.product}>
        <div className={styles.product__card}>
          <div className={styles.product__card_header}>
            <BsHeart />
            <IoShareSocial />
          </div>
          <div className={styles.product__card_body+" row"}>
            <figure className='col-md-5'>
              <img src={urlFor(product.images[0])} alt="" />
            </figure>
            <div className={styles.product__card_body_info+' col-md-7'}>
              <article className={styles.product__details}>
                <h1>{product.title}</h1>
                <h2>{product.title}</h2>
                <hr />
                <h3>Product Info</h3>
                <p className={styles.product__details_text}>{product.blurb.en}</p>
                <hr />
                <ProductQuantity handleProductQuantity={handleProductQuantity} productQuantity={qty}/>
                <div className={styles.product__pricetag}>
                  
                  {product.discount ?  
                  <>
                    <span>It was </span><span><s>$ {product.price.toFixed(2)}</s> - </span>
                    <h6 className='bg-danger d-inline text-white p-1'>{product.discount}% Off</h6>
                    <h4 className='text-center mt-2 h1'>$ {(product.price.toFixed(2) - (product.price.toFixed(2) * product.discount * 0.01)).toFixed(2)}</h4>
                  </>  :
                  <>
                    <h6>Only</h6>
                    <h4>$  {product.price.toFixed(2)}</h4>
                  </>
                  }
                </div>
                <div className={styles.product__card_body_info_buttons}>
                  <button onClick={() => addProduct(product, qty)}>Add to Cart</button>
                  <button>buy Now</button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }, "variants" : [...variants[]{sku}, defaultProductVariant{sku}]
  }`;

  const products = await client.fetch(query)

  const paths = []

  products.forEach(product => {
    product.variants.forEach(variant => {
      paths.push({
        params: {
          slug: product.slug.current,
          sku: variant.sku
        }
      })
    })
  })

  //if fallback blocking is used, the static paths are called before the initial render
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params }) => {
  const { slug, sku } = params

  const query = `*[_type == "product"
  && slug.current == "${slug}"][0]
  {_id,
  "mainName":title,
   blurb,
   discount,
  "variants": [...variants, defaultProductVariant]{
    title,
    sku,
    images,
    details,
    price}
  }`


  const product = await client.fetch(query)

 const variant = product.variants.filter(variant => variant.sku === sku)[0]

  return {
    props: { product: {...product, ...variant} }
  }
}

export default Product
