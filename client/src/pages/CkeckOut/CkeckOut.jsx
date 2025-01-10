
import Payment from "../../components/Payment/Payment"
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/cartHooks';




export default function CkeckOut() {
    const nav = useNavigate()
 const { getCartID,  } = useCart();


    const buttonClick = e => {
    
        if (e.target.value === "cart") {
            nav('/cart')
        }

}




    return (
        <>
          
                <Payment buttonClick={buttonClick} cartNun={getCartID} />
           
            
        </>
    )
}