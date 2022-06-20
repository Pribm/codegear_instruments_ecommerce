import React from 'react'
import styles from './ProductQuantity.module.scss'

const ProductQuantity = ({productQuantity, handleProductQuantity, item_id}) => {
  return (
    <>
    <p className='text-center'>
        Select the quantity:
    </p>
    <p className={styles.quantity}>
        
        <span onClick={() => handleProductQuantity('dec', item_id)}>
            -
        </span>
        <span>
            {productQuantity}
        </span>
        <span onClick={() => handleProductQuantity('inc', item_id)}>
            +
        </span>
    </p>
    </>
  )
}

export default ProductQuantity