import { CardCvcElement, CardExpiryElement, CardNumberElement, AddressElement} from '@stripe/react-stripe-js';
import PropTypes from "prop-types"


export default function CardInput({handleChange }) {

 

  return (
    <>
      

      <h3>Shipping</h3>
  <AddressElement options={{ mode: 'shipping', allowedCountries: ['US']  }} onChange={handleChange} />
      {/* <AddressElement options={{ mode: 'shipping', allowedCountries: ['US'], }} /> */}
      <h3>Billing</h3>
        <AddressElement options={{ mode: 'billing', allowedCountries: ['US']  }} onChange={handleChange} />
       <h3>Card number</h3>
      <CardNumberElement onChange={handleChange} />
       <h3>Expiration date</h3>
      <CardExpiryElement onChange={handleChange}/>
       <h3>cvc code</h3>
      <CardCvcElement onChange={handleChange}/>
    </>
  );
}

CardInput.propTypes = {
    handleChange: PropTypes.func,
   
   
};