import { CardCvcElement, CardExpiryElement, CardNumberElement, AddressElement} from '@stripe/react-stripe-js';
import PropTypes from "prop-types"
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useAuth } from '../../hooks/userHooks';

export default function CardInput({handleChange, saveChanged, saveCard }) {

 const {loggedIn} = useAuth()

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
      <CardCvcElement onChange={handleChange} />
      {loggedIn &&
        <FormControlLabel control={<Checkbox
          checked={saveCard}
        onChange={saveChanged}
        value={saveCard}
          inputProps={{ 'aria-label': 'controlled' }}
        />} label="save Card for future use" />
      }
    </>
  );
}

CardInput.propTypes = {
    handleChange: PropTypes.func,
   saveChanged: PropTypes.func,
   saveCard: PropTypes.bool,
};