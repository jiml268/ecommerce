import css from './cartTotals.module.css';
import { useCart } from '../../hooks/cartHooks';


//import { useDispatch } from 'react-redux';

export default function CartTotals() {
    // const dispatch = useDispatch()
    const {  getAllCartItems  } = useCart();

    let itemCnt = 0;
    let originalTot = 0;
    let discountTot = 0;
    let totalDue = 0
    let shipping = 0

    getAllCartItems.forEach((element) => {
        itemCnt = element.quantity + itemCnt
        originalTot = originalTot + (element.price * element.quantity)
        if (element.salepercent !== null) {
            const discountAmt = (element.price * element.salepercent*100 /100 ).toFixed(2)* element.quantity
            

            discountTot = discountTot + (discountAmt * 1)
            
        }
        totalDue = totalDue +  ((element.price * element.quantity) - (element.price * element.salepercent* element.quantity).toFixed(2))
    });
    totalDue<35?shipping = 6.99:shipping = 0
    
    return (
        <div className={css.totalSection}>
            <div className={css.totalInfo}>
                <div className={css.totalGroup}>
                    <div className={css.itemGroup}>
                        <h3>Subtotal </h3>
                        <p className={css.numOfItems}>{itemCnt}{itemCnt === 1 ? " item" : " items"}</p>
                        </div>
                <p className={`${css.cartAmts} ${discountTot>0?css.discount:""}`}>${originalTot.toLocaleString('en-US')}</p>
            </div>
           
            {discountTot > 0 &&
                <div>
                <div className={css.totalGroup}>
                    <h3>Savings</h3>
                    <p className={css.cartAmts}>${discountTot.toLocaleString('en-US')}</p>
                </div>
                    <div>
                        <p className={css.cartAmts} style={{ textAlign: "right" }}>${totalDue.toLocaleString('en-US') } </p>    
                    </div>
                    
                </div>
            }
<div className={css.totalGroup}>
            <h3>Shipping</h3>
                <h3 className={css.cartAmts}>{shipping === 0 ? "free" : "$6.99"}</h3>
                </div>
            {totalDue < 35 && <p>${35 - totalDue} needed for free shipping</p>}
            <div className={css.totalGroup}>
                <h3>Estimated total</h3>
                <h3 className={css.cartAmts}>${(totalDue + shipping).toLocaleString('en-US')}</h3>
            </div>
 </div>
            </div>
    )
}