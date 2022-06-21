import { useStateContext } from 'context/StateContext'
import { urlFor } from 'lib/client'
import { useRouter } from 'next/router'
import React from 'react'
import styles from './HorizontalCard.module.scss'

import Image from 'next/image'

const HorizontalCard = ({product}) => {

    const {addProduct} = useStateContext()

    const router = useRouter()

    return (
        <div className={'card mt-3 p-4 ' + styles.card}>
            <div className={"row "+styles.card__body}>
                <div className={"col-md-3 d-flex align-items-center "+styles.card__body_imageContainer}>
                    <Image src={urlFor(product.images[0])} alt='' className={'img-fluid'} />
                </div>
                <div className={"col-md-6 "+styles.card__body_info}>
                    <h4>{product.mainName}</h4>
                    <h5>{product.title}</h5>
                    {
                        product.details ?
                            <ul>
                            {product.details?.map((p) => {
                                return <li key={p._id}>{p.detail}</li>
                            })}
                            </ul>
                        :
                        <p>{product.blurb.en}</p>
                    }
                </div>
                <div className={"col-md-3 "+styles.card__body_price}>
                    <h4>$ {product.price.toFixed(2)} {product.discount && <span>-{product.discount}% Off</span>}</h4>
                    <h3>$ {(product.price - (product.price * product.discount * 0.01)).toFixed(2)}</h3>
                    <div className={styles.card__body_price_buttons}>
                        <button onClick={() => addProduct(product, 1)}>
                            Add to Cart
                        </button>
                        <button onClick={() => router.push(`product/${product.slug}/${product.sku}`)}>
                            Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HorizontalCard