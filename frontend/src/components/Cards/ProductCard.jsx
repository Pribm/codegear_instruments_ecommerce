import { useStateContext } from 'context/StateContext'
import { urlFor } from 'lib/client'
import React from 'react'
import { RiDeleteBinFill } from 'react-icons/ri'
import styles from './ProductCard.module.scss'

const ProductCard = ({product}) => {

    const {toggleCartItemQuantity } = useStateContext()

  return (
    <div className={'mt-3 p-4 ' + styles.card}>
        <div className={"row "+styles.card__body}>
            <div className={"col-md-2 "+styles.card__body_imageContainer}>
                <img src={urlFor(product.images[0])} alt={product.title} className={'img-fluid'} />
            </div>
            <div className={"col-md-9 "+styles.card__body_productInfoContainer}>
                <h4 className='fw-bolder' style={{color: '#b00'}}>{product.mainName}</h4>
                <h5 className='text-secondary'>{product.title}</h5>
                <h3 className='fw-bolder text-black'>$ {(product.price - (product.price * product.discount * 0.01)).toFixed(2)}</h3>
            </div>
            <div className={"col-md-1 "+styles.card__body_buttonsContainer}>
                <span className='cursor-pointer' onClick={() => toggleCartItemQuantity(product._id, 'inc')}>+</span>
                <span>{product.quantity}</span>
                <span className='cursor-pointer' onClick={() => toggleCartItemQuantity(product._id, 'dec')}>-</span>
            </div>
        </div>
        <RiDeleteBinFill className={styles.deleteIcon}/>
    </div>
  )
}

export default ProductCard