import React, {useState, useEffect} from 'react'
import styles from './Hero.module.scss'

import {images} from 'constants'

import {GiShoppingCart} from 'react-icons/gi'

import { client} from 'lib/client'

import {Carousel} from 'react-bootstrap'
import { useStateContext } from 'context/StateContext'

import MyImage from 'lib/SanityImageBuilder'

const Hero = () => {

  const [mainProducts, setMainProducts] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [itemIds, setItemIds] = useState([])

  const {handleCheckout} = useStateContext()

  useEffect(() => {
    const query = `*
    [_type == "product" && mainProduct == true]
    {'vendor': vendor->title,
    _id,
    'product': defaultProductVariant,
    discount}`
    client.fetch(query).then(data => {
      setItemIds(data.map((item) => (
        {id: item._id,
          sku: item.product.sku,
          quantity: 1,
          price: item.product.price,
          image: item.product.images[0].asset._ref
        }
      )))
      setMainProducts(data)
      setLoading(false)
    })
  }, [])

  return (
    !isLoading &&
    <section className={styles.hero}>
          <Carousel className='container'>
            {mainProducts.map((mainProduct, index) => (
              <Carousel.Item key={index}>
              <div className={styles.hero__productContainer}>
              <div className={styles.hero__productContainer_image}>
                <MyImage
                alt="product Image"
                className={styles.hero__productContainer_image_inner}
                src={mainProduct.product.promotionalImage
                ? mainProduct.product.promotionalImage
                : mainProduct.product.images[0]
                }
                layout={'fill'}
                objectFit={'cover'}
                objectPosition={'center center'}
                sanityWidth={500}
                sanityHeight={500}
                />
              </div>
              <div className={styles.hero__productContainer_info} style={{background: `url(${images.bgHero.src})`}}>
                <h1>{mainProduct.vendor}</h1>
                <div className={styles.hero__productContainer_info_subtext}>
                  <h3>{mainProduct.product.title}</h3>
                </div>
                

                <div className={styles.hero__productContainer_info_priceTag}>
                  <h5>It can be yours by</h5>
                  <h3>$ {mainProduct.discount ? (mainProduct.product.price - (mainProduct.product.price * mainProduct.discount * 0.01)).toFixed(2) : mainProduct.product.price.toFixed(2)}</h3>
                  {
                    mainProduct.discount &&
                    <>
                    <h4 className='bg-danger text-white py-2'>
                      Discount of {mainProduct.discount} %
                    </h4>
                    <h5>
                      Full Price: {mainProduct.product.price.toFixed(2)}
                    </h5>
                    </>
                  }
                </div>

                <button onClick={() => handleCheckout([itemIds[index]])}>
                  <GiShoppingCart />
                  Buy Now
                </button>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  )
}

export default Hero