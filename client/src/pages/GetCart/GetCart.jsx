import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCart } from '../../hooks/cartHooks' 
import { getCart } from '../../redux/cart/cartOperators';
import CartInfo from '../../components/CartInfo/CartInfo';
import CartTotals from '../../components/CartTotals/CartTotals';
import EmptyCart from '../EmptyCart/EmptyCart'
import css from './GetCart.module.css';


export default function GetCart() {
    const dispatch = useDispatch()
    const { getCartID, getAllCartItems } = useCart()

    useEffect(() => {
       
        const getCartItems = async () => {
            const currentCart = { cartID: getCartID }
          await dispatch(getCart(currentCart))
      
        }
       

        if (getCartID) {
            getCartItems()
        }

       
    }, [dispatch, getCartID])



    return (
    <>
       
            {getAllCartItems ?
                <div className={css.cartSection}>
                < CartInfo />
                <CartTotals />
                </div>
                :
                <EmptyCart />
            }
        </>
    

)
}
