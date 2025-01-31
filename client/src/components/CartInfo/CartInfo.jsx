import css from './CartInfo.module.css';
import { useAuth } from '../../hooks/userHooks';
import { useCart } from '../../hooks/cartHooks';
import CartButtons from '../CartButtons/CartButtons';
import { useDispatch } from 'react-redux';
import { deleteItem, getCart, saveForLater, addquantity, decreasequantity } from '../../redux/cart/cartOperators';

export default function CartInfo() {
     const dispatch = useDispatch()
    const { loggedIn, getUserId } = useAuth();
        const { getCartID,  getAllCartItems, getAllCartImages } = useCart();
    

   
    
    const SaveClicked = async e => {

const index = getAllCartItems.findIndex(item => item.sku === e.target.value);
const saveInfo = { sku: e.target.value, userID: getUserId, cartID: getCartID, quantity: getAllCartItems[index].quantity  }
        await dispatch(saveForLater(saveInfo))
        await dispatch(deleteItem(saveInfo))
       await dispatch(getCart(saveInfo))
       
       
    }

     const changeClicked = async e => {
         const getSKU = e.target.value
    

  const changeQty = {sku:getSKU, cartID: getCartID, id: getUserId}
    if (e.target.name === "increase") {
      await dispatch(addquantity(changeQty))
    }
    if (e.target.name === "decrease") {
      await dispatch(decreasequantity(changeQty))
    }
       await dispatch(getCart(changeQty))
       
    }

const removeClicked = async e => {
        const info = { sku: e.target.value, userID: getUserId, cartID: getCartID }
        await dispatch(deleteItem(info))
        await dispatch(getCart(info))
        
    }


    
    return (<>
        {console.log('getAllCartItems', getAllCartItems)}
       
   
    {getAllCartItems &&
            <div className={css.produceSection}>
                <p>cart item</p>
             <div className={css.cartOption}>
              <CartButtons />
            </div>
            {getAllCartItems.map((item, index) => {
                const imageindex = getAllCartImages.findIndex(iteminfo => iteminfo.ProductID === item.ProductID && iteminfo.colorID === item.colorID)
                const showimage = imageindex >= 0 ? window.location.origin + `/images/${getAllCartImages[imageindex].imageName}` : `/images/Image-Coming-Soon.png}`
            
                return (
                    <div  key={index}>
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
                                    

                                    <h4>${!item.salepercent ? (item.price * item.quantity).toFixed(2).toLocaleString('en-US') : ((item.price - (item.price * item.salepercent).toFixed(2)) * item.quantity).toLocaleString('en-US')}</h4>
                                    {item.quantity > 1 && <p> ${(item.price - (item.price * item.salepercent).toFixed(2).toLocaleString('en-US'))} each </p>}
                                    {item.salepercent && <p className={css.sale}>${item.price} each</p>}

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



