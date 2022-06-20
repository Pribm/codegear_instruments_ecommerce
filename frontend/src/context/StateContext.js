import getStripe from 'lib/getStripe'
import React, {createContext, useContext, useState} from 'react'

import {toast} from 'react-toastify'

const Context = createContext()

export const StateContext = ({children, states}) => {

    const [qty, setqty] = useState(1)
    const [cartItems, setcartItems] = useState([])
    const [totalPrice, settotalPrice] = useState(0)
    const [showCart, setShowCart] = useState(false)
    const [isSearching, setSearching] = useState(false)

    const notify = text => toast.success(text, {
        autoClose: 1000,
        hideProgressBar: true,
    })

    const addProduct = (product, quantity) => {

        const checkProductInCart = cartItems.find(item => item.sku === product.sku);

        settotalPrice(totalPrice => parseFloat(totalPrice + (product.price * quantity)))
        
        if(checkProductInCart && typeof checkProductInCart !== 'undefined'){

            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setcartItems(updatedCartItems)
        }else{
            product.quantity = quantity;    
            setcartItems([...cartItems, {...product}])
        }
        notify(`${quantity} ${product.mainName} ${product.title} added to cart`)
    }

    const increaseQty = () => {
        setqty(qty => parseInt(qty+1))
    }

    const decreaseQty = () => {
        setqty(qty => {
            if((qty-1) <= 1) return qty = parseInt(1); 
            return qty-1
        })
    }

    const toggleCartItemQuantity = (id, value) => {

        let newPrice = 0;

        let newCartItems = cartItems.map(cart_item => {

            if(cart_item._id === id){
                if(value === 'inc'){
                    cart_item.quantity++
                }
                else if(value === 'dec'){
                    if(cart_item.quantity <= 1){
                        cart_item.quantity = 1
                    }else{
                        cart_item.quantity--
                    }
                } 
            }
            newPrice += cart_item.quantity * cart_item.price
            settotalPrice(newPrice)
            
            return cart_item
        })

       if(value === 'inc'){
            setcartItems(newCartItems)

        }else if(value === 'dec'){
            setcartItems(newCartItems)
        } 
    }

    const seeTotalQuantities = (totalQuantities = 0) => {
        cartItems.map(item => totalQuantities += parseInt(item.quantity))
        return totalQuantities
    }

    const handleCheckout = async (itemIds) => {
        toast.info('Redirecting to checkout...', {
            autoClose: false,
            closeButton:false,
            closeOnClick:false,
            toastId: 'buy_toast'
        })

        const stripe = await getStripe()
  
        const response = await fetch('/api/stripe', {
          method:"POST",
          body: JSON.stringify(itemIds),
          headers: {
            'Content-Type' : 'application/json'
          }
        })
        
        if(response.status === 500){
            toast.dismiss('buy_toast')
            toast.error('The product request has failed, try again!')
            return
        };
    
        const data = await response.json();

        
        stripe.redirectToCheckout({ sessionId: data.id })
    }

    return (
        <Context.Provider value={{
            qty,
            setqty,
            increaseQty,
            decreaseQty,
            cartItems,
            addProduct,
            totalPrice,
            settotalPrice,
            toggleCartItemQuantity,
            seeTotalQuantities,
            showCart,
            setShowCart,
            isSearching,
            setSearching,
            handleCheckout
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)