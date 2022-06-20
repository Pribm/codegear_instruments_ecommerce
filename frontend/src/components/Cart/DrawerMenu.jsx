//import { useStateContext } from 'context/StateContext'
import ProductCard from 'components/Cards/ProductCard'
import { useStateContext } from 'context/StateContext'
import React, { useState } from 'react'
import { slide as Menu} from 'react-burger-menu'
import { styles } from './DrawerMenuStyles'

import { useEffect } from 'react'

const DrawerMenu = () => {

    const {showCart, setShowCart, cartItems, seeTotalQuantities, totalPrice, handleCheckout} = useStateContext()

    const [itemIds, setItemIds] = useState([])

    useEffect(() => {
      setItemIds(itemIds => itemIds = cartItems.map(cartItem => (
        {id: cartItem._id,
          sku: cartItem.sku,
          quantity: cartItem.quantity,
          price: cartItem.price,
          subtotal: totalPrice.toFixed(2),
          image: cartItem.images[0].asset._ref
        }
      )))
    }, [showCart, cartItems])

    

  return (
    <Menu 
    customBurgerIcon={ false }
    right
    isOpen={showCart}
    onClose={() => setShowCart(false)}
    itemListElement="div"
    styles={styles}
    width={480}
    >
        <div className="d-flex h-100 flex-column">
        <h3>{seeTotalQuantities()} Items in the cart</h3>
        {
          cartItems.length > 0 ?
          cartItems.map((cartItem, index) => {
            return (
              <React.Fragment key={'cart_item'+index}>
                <ProductCard product={cartItem}/>
              </React.Fragment>
            )
          })

          :

          <div>
            <h1>There's no item yet!</h1>
          </div>
        }
        <div className='mt-auto text-end py-4'>
          <h2 className='text-black'>Subtotal:</h2>
          <h3 className='text-black fw-bold'>$ {totalPrice.toFixed(2)}</h3>
        </div>
        <button className='btn btn-outline-danger btn-lg p-4' onClick={() => handleCheckout(itemIds)}>
          Proceed To Checkout
        </button>

        </div>
    </Menu>
  )
}

export default DrawerMenu