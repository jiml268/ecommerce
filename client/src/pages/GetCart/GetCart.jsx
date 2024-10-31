import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCart } from '../../hooks/cartHooks' 
import { getCart } from '../../redux/cart/cartOperators';
import CartInfo from '../../components/CartInfo/CartInfo';

export default function GetCart() {
    const dispatch = useDispatch()
    const { getCartID,  } = useCart()
   

    const [currentCart, SetCurrentCart] = useState(null)
    const [cartImages, SetCartImages] = useState(null)


    useEffect(() => {
       
        const getCartItems = async () => {
            const currentCart = { cartID: getCartID }
            const result = await dispatch(getCart(currentCart))
           
            SetCurrentCart(result.payload.data.cart)
            SetCartImages(result.payload.data.images)
        }
       

        if (getCartID) {
            getCartItems()
        }

       
    }, [dispatch, getCartID])

    return (
    <>
       
            {currentCart &&
                < CartInfo currentCart={currentCart} cartImages={cartImages} />
            }
        </>
    

)
}
