import css from './cartButtons.module.css';
import { emptyCart } from '../../redux/cart/cartOperators';
import { useDispatch } from 'react-redux';
import { useCart } from '../../hooks/cartHooks';
import { useNavigate } from 'react-router-dom';
 


export default function CartButtons() {
    const dispatch = useDispatch()
    const nav = useNavigate()
 const { getCartID,  } = useCart();
    const checkoutClicked = () => {
        console.log('checkout')
    }

    const emptyClicked = async() => {
        console.log('emptyClicked')
        await dispatch(emptyCart({ cartID: getCartID }))
        nav('/emptyCart')
    }

    return (
        <>
  <button type='button' onClick={checkoutClicked} className={css.checkout}>Proceed to checkout</button>
                <button type='button' onClick={emptyClicked} className={css.empty}>empty Cart</button>
   </>
            )
}