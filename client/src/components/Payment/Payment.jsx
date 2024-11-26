import PropTypes from "prop-types"
import { Button} from '@mui/material';
import {useStripe, useElements,  CardNumberElement, AddressElement, CardCvcElement, CardExpiryElement  } from '@stripe/react-stripe-js';
import { getStripeID, CreateStripeAcct } from "../../redux/payments/paymentsOperators";
import CardInput from "../CardInput/CardInput";
import { useDispatch } from "react-redux";
import { paymentIntent } from "../../redux/payments/paymentsOperators";
import { useState } from "react";
import { useAuth } from "../../hooks/userHooks";
import { useCart } from "../../hooks/cartHooks";
import { toast } from 'react-toastify';
import { addToOrders } from "../../redux/cart/cartOperators";

const toastOptions = {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",

         }


export default function Payment({ buttonClick, cartNun }) {
  const { getUserEmail, getUserId, loggedIn } = useAuth()
  const {getCartID} = useCart()
   const [billAddress, setBillAddress] = useState(null);
  const [shipAddress, setShipAddress] = useState(null);
  const [cardNum, setCardNum] = useState(null);
  const [expires, setexpires] = useState(null);
  const [cvcCode, setCvcCode] = useState(null);
  const [saveCard, setSaveCard] = useState(false)
  let stripeID = null

  const handleChange = (event) => {  
    
    switch(event.elementType) {
      case "address":
        if (event.elementMode === "shipping") {
          setShipAddress(event.complete ? event.value : null);
        } else
          setBillAddress(event.complete ? event.value : null);
        break;
      case "cardNumber":
        setCardNum(event.complete ? event.complete : null);
        break;
       case "cardExpiry":
        setexpires(event.complete ? event.complete : null);
        break;
       case "cardCvc":
        setCvcCode(event.complete ? event.complete : null);
        break;
      default:
    break
}
   
  }
  const saveChanged = (event) => {
    console.log(event.target.value)
     setSaveCard(!saveCard)
   }


    const dispatch = useDispatch()
     const stripe = useStripe();
    const elements = useElements();
    
    const handleSubmit = async () => {
        if (!stripe || !elements) {
            return;
      }

      if (loggedIn) {
        const id = await dispatch(getStripeID({ userEmail: getUserEmail, saveCard: saveCard }))
      
        if (id.payload.data.stripeID === '') {
          const newID = await dispatch(CreateStripeAcct({ userEmail: getUserEmail }))
         
          stripeID = newID.payload.data.ID
        } else {
          stripeID = id.payload.data.stripeID
        }
      }
  
const res = await dispatch(paymentIntent({ cartNun, customer: stripeID, saveCard: saveCard}))
      const clientSecret = res.payload.data.clientSecret;
       const result = await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
           card: elements.getElement(CardNumberElement),
           billing_details: {
             name: billAddress.name,
             address: billAddress.address
           },
         },
       shipping: {
      name: shipAddress.name,
      address: shipAddress.address
      },
        
    });
    console.log(result)
      if (result.error) {

       toast.error(result.error.message, 
            toastOptions);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Money is in the bank!');
        elements.getElement(CardNumberElement).clear();
                elements.getElement(CardCvcElement).clear();
        elements.getElement(CardExpiryElement).clear();
                elements.getElement(AddressElement, { mode: 'billing' }).clear();
        elements.getElement(AddressElement, { mode: 'shipping' }).clear();
         setBillAddress(null);
        setShipAddress(null);
dispatch(addToOrders({cartID: getCartID , custID: getUserId, stripeID:result.paymentIntent.id }))
      }
    }
    }

    return (
      <form>
       
      <CardInput handleChange= {handleChange} saveChanged= {saveChanged} saveCard={saveCard}  />
     
        <div >
      

          <Button variant="contained" color="primary"  onClick={handleSubmit} disabled = {!billAddress || !shipAddress || !cardNum || !expires || !cvcCode }>
            Pay
          </Button>
         
        </div>
           
                 <button type="button" onClick={buttonClick} value="cart">Return to cart</button>
                 
    </form>
  );
            
    
}

Payment.propTypes = {
    buttonClick: PropTypes.func,
    shippingAddress: PropTypes.object,
    billingAddress: PropTypes.object,
    cartNun: PropTypes.string
};