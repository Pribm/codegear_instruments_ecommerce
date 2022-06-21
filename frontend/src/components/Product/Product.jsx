import { urlFor } from 'lib/client'
import React from 'react'
import styles from './Product.module.scss'

import { useRouter } from 'next/router'
import { useStateContext } from 'context/StateContext'

import Image from 'next/image'
import MyImage from 'lib/SanityImageBuilder'

const Product = ({product, mainName}) => {

    const router = useRouter()
    const {addProduct, handleCheckout} = useStateContext()

    return (
        <div className={styles.product}>
            <article>
                <div onClick={() => router.push(`product/${product.slug}/${product.sku}`)} className='d-flex flex-column h-100'>
                    <figure>
                        <MyImage src={product.images[0]} width={450} height={550}/>
                    </figure>
                    <figcaption className='mt-auto'>
                        <h3>{mainName}</h3>
                        <h5>{product.title}</h5>
                    </figcaption>
                    <div className={styles.product__price}>
                        <h4>$
                            {
                                product.discount ?
                                    (product.price - (product.price * product.discount * 0.01)).toFixed(2)
                                    :
                                    product.price.toFixed(2)
                            }</h4>
                        {
                            product.discount  &&

                            <>
                                <span>$ {product.price.toFixed(2)}</span><span> full price</span>
                            </>

                        }
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button onClick={() => addProduct(product, 1)}>Add To cart</button>
                    <button onClick={() => handleCheckout([
                        {id: product._id,
                            sku: product.sku,
                            quantity: 1,
                            image: product.images[0].asset._ref
                        }
                    ])}>Buy Now</button>
                </div>

                {product.discount && <span className={styles.product__discount}>{product.discount}% Off</span>}
            </article>
        </div>
    )
}

export default Product