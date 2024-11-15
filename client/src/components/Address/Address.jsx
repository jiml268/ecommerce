import PropTypes from "prop-types"
import { TextField, Grid, Button,  Typography, Checkbox, FormControlLabel} from '@mui/material';


export default function Address({ shippingAddress, billingAddress, updateAddress, page, buttonClick }) {

    return (
        <>
        <form >
          <Typography variant="h3">{page === 'ship' ? "Shipping Address" : "Billing Address"}</Typography>
          <Grid container spacing={2}>
             {page === 'bill' && 
              <Grid item xs={12}>
                {console.log('billingAddress.sameAddress', billingAddress.sameAddress)}
 <FormControlLabel control={<Checkbox checked={billingAddress.sameAddress}
                onChange={updateAddress}
                  name="sameAddress"
                 
                 inputProps={{ 'aria-label': 'controlled' }}/>} label="Use Shipping address as the Billing Address" />
              </Grid> 
             }
        <Grid item xs={12}>
          <TextField
                fullWidth
                required
            label="Full Name"
            name="name"
            value={page === 'ship'?shippingAddress.name:billingAddress.name}
            onChange={updateAddress}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
                fullWidth
                required
            label="Address Line 1"
            name="line1"
            value={page === 'ship'?shippingAddress.line1:billingAddress.line1}
            onChange={updateAddress}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address Line 2"
            name="line2"
            value={page === 'ship'?shippingAddress.line2:billingAddress.line2}
            onChange={updateAddress}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
                fullWidth
                required
            label="City"
            name="city"
            value={page === 'ship'?shippingAddress.city:billingAddress.city}
            onChange={updateAddress}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
                fullWidth
                required
            label="State/Province"
            name="state"
            value={page === 'ship'?shippingAddress.state:billingAddress.state}
            onChange={updateAddress}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
                fullWidth
                required
            label="Zip/Postal Code"
            name="zip"
            value={page === 'ship'?shippingAddress.zip:billingAddress.zip}
            onChange={updateAddress}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="button" variant="contained"  value="cart" onClick={buttonClick}>
            Return to cart
              </Button>
              {page === "ship" ?
                <Button type="button" variant="contained" value="bill" onClick={buttonClick} > Billing Address</Button> :
                <>
                    <Button  type="button" variant="contained" value="ship" onClick={buttonClick}> Return to shipping Address</Button>
                     <Button type="button" variant="contained"  value="pay" onClick={buttonClick}> Payment</Button>
                </>
            }
              
        </Grid>
      </Grid>
    </form>
        </>
    )
}

Address.propTypes = {
    shippingAddress: PropTypes.object,
    billingAddress: PropTypes.object,
    updateAddress: PropTypes.func,
    page: PropTypes.string,
    buttonClick: PropTypes.func,

};