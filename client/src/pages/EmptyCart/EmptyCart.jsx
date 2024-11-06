import css from './emptyCart.module.css'
import { Link } from "react-router-dom";
export default function EmptyCart() {


    return (
        <div className={css.emptyCartSection}>
        <div className={css.emptyCart}>
            <h2>Your Cart is empty</h2>
 <Link to="/">Start Shopping</Link>
            </div>
            </div>
    )
}
