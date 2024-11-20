import PropTypes from "prop-types"
import { Button} from '@mui/material';
import {useStripe, useElements,  CardNumberElement,  } from '@stripe/react-stripe-js';

import CardInput from "../CardInput/CardInput";
import { useDispatch } from "react-redux";
import { paymentIntent } from "../../redux/payments/paymentsOperators";
import { useState } from "react";


export default function Payment({ buttonClick, cartNun }) {
   const [billAddress, setBillAddress] = useState(null);
  const [shipAddress, setShipAddress] = useState(null);
  const [cardNum, setCardNum] = useState(null);
  const [expires, setexpires] = useState(null);
   const [cvcCode, setCvcCode] = useState(null);

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
  


    const dispatch = useDispatch()
     const stripe = useStripe();
    const elements = useElements();
    
    const handleSubmit = async () => {
        if (!stripe || !elements) {
            return;
        }
  
const res = await dispatch(paymentIntent({ cartNun}))
       
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

    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result);
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Money is in the bank!');
      
      }
    }
    }

    return (
      <form>
       
      <CardInput handleChange= {handleChange}  />
     
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