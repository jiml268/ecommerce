import PropTypes from "prop-types"
import { Button} from '@mui/material';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CardInput from "../CardInput/CardInput";
import { useDispatch } from "react-redux";
import { paymentIntent } from "../../redux/payments/paymentsOperators";




export default function Payment({ buttonClick, billingAddress, shippingAddress, cartNun} ) {
    const dispatch = useDispatch()
     const stripe = useStripe();
    const elements = useElements();
    
    const handleSubmit = async () => {
        if (!stripe || !elements) {
            return;
        }
        const billing =  {
                    name: billingAddress.name,
                    address: {
                        city: billingAddress.city,
                        line1: billingAddress.line1,
                        line2: billingAddress.line2,
                        zip: billingAddress.zip,
                        state: billingAddress.state,
                        country: "US"

                    },
        }
        const shipping =  {
                    name: shippingAddress.name,
                    address: {
                        city: shippingAddress.city,
                        line1: shippingAddress.line1,
                        line2: shippingAddress.line2,
                        zip: shippingAddress.zip,
                        state: shippingAddress.state,
                        country: "US"

                    },

                }
const res = await dispatch(paymentIntent({billing, shipping, cartNun}))
       console.log(res)
        const clientSecret = res.payload.data.clientSecret;
        console.log(clientSecret)



       const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),   
           },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Money is in the bank!');
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
    }

    return (
 <form>
      <CardInput />
      <button>Submit</button>
        <div >
          <Button variant="contained" color="primary"  onClick={handleSubmit}>
            Pay
          </Button>
         
        </div>
           
                 <button type="button" onClick={buttonClick} value="cart">Return to cart</button>
           
                <button type="button" value="bill" onClick={buttonClick}> Billing Address</button> 
                
                    <button type="button" value="ship" onClick={buttonClick}> Shipping Address</button>
                    <button type="button" value="submite payment"> Payment</button>
    </form>
  );
            
    
}

Payment.propTypes = {
    buttonClick: PropTypes.func,
    shippingAddress: PropTypes.object,
    billingAddress: PropTypes.object,
    cartNun: PropTypes.string
};