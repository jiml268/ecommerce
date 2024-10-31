import PropTypes from 'prop-types';
import css from './CartInfo.module.css';
import { useAuth } from '../../hooks/userHooks';
import { useCart } from '../../hooks/cartHooks';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteItem, getCart, saveForLater, addquantity, decreasequantity } from '../../redux/cart/cartOperators';


export default function CartInfo({ currentCart, cartImages }) {
     const dispatch = useDispatch()
    const { loggedIn, getUserId } = useAuth();
        const { getCartID,  } = useCart();

    const [cartItems, setCartItems] = useState(null)

    useEffect(() => {
          setCartItems(currentCart) 
        }, [currentCart, ])
    
    const SaveClicked = async e => {
 const saveInfo = { sku: e.target.value, userID: getUserId, cartID: getCartID }
        await dispatch(saveForLater(saveInfo))
        await dispatch(deleteItem(saveInfo))
        const response = await dispatch(getCart(saveInfo))
        setCartItems(response.payload.data.cart)
       
    }

     const changeClicked = async e => {
         console.log(e.target.value)
         const getSKU = e.target.value
    

  const changeQty = {sku:getSKU, cartID: getCartID, id: getUserId}
    if (e.target.name === "increase") {
      await dispatch(addquantity(changeQty))
    }
    if (e.target.name === "decrease") {
      await dispatch(decreasequantity(changeQty))
    }
        const response = await dispatch(getCart(changeQty))
        setCartItems(response.payload.data.cart)
    }

const removeClicked = async e => {
        const info = { sku: e.target.value, userID: getUserId, cartID: getCartID }
        await dispatch(deleteItem(info))
        const response = await dispatch(getCart(info))
        setCartItems(response.payload.data.cart)
    }
    
return (<>
   
    {cartItems &&
        <div>
            {cartItems.map((item, index) => {
                const imageindex = cartImages.findIndex(iteminfo => iteminfo.ProductID === item.ProductID && iteminfo.colorID === item.colorID)
                const showimage = imageindex >= 0 ? window.location.origin + `/images/${cartImages[imageindex].imageName}` : `/images/Image-Coming-Soon.png}`
            
                return (
                    <div className={css.produceSection} key={index}>
                        <div key={index} className={css.productInfo}>
                            <div className={css.itemSection} >
   
                                <div className={css.imageSection} >
                                    <img src={showimage} alt='product image' className={css.productImage} />
                                </div>
                                <div className={css.infoSection}>
                                    <h3 className={css.infoText}>{item.ProductName}</h3>
                                    {item.colorName && <p className={css.infoText}>Color: {item.colorName}</p>}
                                    {item.sizeName && <p className={css.infoText}>Size: {item.sizeName}</p>}
                                </div>
                                <div className={css.priceSection}>
                                    <h4>${!item.salepercent ? (item.price * item.quantity).toLocaleString('en-US') : ((item.price - (item.price * item.salepercent).toFixed(2)) * item.quantity).toLocaleString('en-US')}</h4>
                                    {item.quantity > 1 && <p> ${(item.price - (item.price * item.salepercent).toFixed(2).toLocaleString('en-US'))} each </p>}
                                    {item.salepercent && <p className={css.sale}>${item.price.toLocaleString('en-US')} each</p>}

                                    {item.salepercent && <p><span className={css.saveText}>You save:  </span>${((item.price * item.salepercent).toFixed(2) * item.quantity).toFixed(2).toLocaleString('en-US')}</p>}
                                    <div>
                                        {loggedIn &&
                                            <button type='button' onClick={SaveClicked} className={css.buttonOptions} value={item.sku}>Save for later</button>
                                        }
                                        <button type='button' onClick={removeClicked} className={css.buttonOptions} value={item.sku}>Remove</button>

                                        <div className={css.cartButtons}>
                                            <button type='button' onClick={changeClicked} value={item.sku} name='decrease' className={`${css.changeQnty}`}> -
                                            </button >
                                            <button type='button' className={`${css.addtocart} ${css.incart}`}>{
                                                item.quantity
                                            }
                                            </button >
                                          
                                            <button type='button' onClick={changeClicked} value={item.sku} name='increase' className={`${css.changeQnty} ${item.quantity >= item.Stock ? css.hideButton : ""}`}> +
                                            </button >
                                        </div>

                                    </div>
                            
                            
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </div>
    }
     
</>
)
}



CartInfo.propTypes = {
  currentCart: PropTypes.array,
    cartImages: PropTypes.array,
};