import PropTypes from "prop-types"
import { TextField, Grid,  Typography,} from '@mui/material';


export default function Address({ currectInfo, infochange }) {

    return (
        <>
        <div >
          <Typography variant="h5">Billing Address</Typography>
          <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
                fullWidth
                required
            label="Address Line 1"
            name="line1"
            value={currectInfo.line1}
            onChange={infochange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address Line 2"
            name="line2"
            value={currectInfo.line2}
            onChange={infochange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
                fullWidth
                required
            label="City"
            name="city"
            value={currectInfo.city}
            onChange={infochange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
                fullWidth
                required
            label="State/Province"
            name="state"
            value={currectInfo.state}
            onChange={infochange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
                fullWidth
                required
            label="Zip/Postal Code"
            name="zip"
            value={currectInfo.postal_code}
            onChange={infochange}
          />
        </Grid>

      </Grid>
    </div>
        </>
    )
}

Address.propTypes = {
    currectInfo: PropTypes.object,
    infochange: PropTypes.func,

};

