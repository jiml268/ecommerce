import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { styled } from '@mui/system';
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editAddress, updateDefault, addAddress } from '../../redux/addresses/addressOperators';
import { useSelector } from "react-redux"
import { getID } from "../../redux/users/usersSelectors"
import allStates from '../../data/allStates.json'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  const navigate = useNavigate()
  const location = useLocation();
  const dispatch = useDispatch()
  const {address, address_type, newOrUpdate} = location.state;
const userID = useSelector(getID)
    const [editCurrentAddress, setEditCurrentAddress] = useState(address ? address : [])
  const [checked, setChecked] = useState(address.default_addtress === 0 ? false : true);
  

  
  const handleSubmit = async (e) => {
    if (e.target.value === 'update') {
      if (checked === true) {
        const defaultAddress = {
          address_type: address_type,
          id_number: address.id,
          user_id: userID
        }
        await dispatch(updateDefault(defaultAddress))
      }
      const updateInfo = { address: editCurrentAddress, type: address_type, setTodefault: checked }
      if (newOrUpdate === "Update") {
       console.log('update ran')
        await dispatch(editAddress(updateInfo));
      } 
        if (newOrUpdate === "New") {
       console.log('new ran')
        await dispatch(addAddress(updateInfo));
       
      }
      const addressType = {type: address_type}
   navigate("/alladdresses", { state: addressType });
        } else {
          const addressType = {type: address_type}
   navigate("/alladdresses", { state: addressType });
        }
  }

  const handleStateChange = (event) => {
    
    
     setEditCurrentAddress({
             ...editCurrentAddress,
           state: event.target.value,
         });
  };
  
   const changeHandler = e => {
    

        const { name, value } = e.target;
        setEditCurrentAddress({
             ...editCurrentAddress,
           [name]: value,
         });
  }
  
   const handleswitch = (event) => {
    setChecked(event.target.checked);
  };
    
  return (
     <Container component="main" maxWidth="xs">
        <CssBaseline />
    <Box component="form"  sx={{ mt: 3 }}>
      {
        Object.keys(editCurrentAddress).length > 0 &&
        <Grid container spacing={3}>
          <FormGrid item xs={12} md={5}>
           
             <TextField
              id="first-name"
              name="first_name"
              type="name"
              placeholder="John"
                autoComplete="first name"
                label="First Name"
                required
                 value={editCurrentAddress.first_name}
                onChange={changeHandler}
            />
          </FormGrid>
          <FormGrid item xs={2} >
           
              <TextField
                label="Init"
              id="middle-init"
              name="middle_init"
              type="name"
              placeholder="M"
              autoComplete="middle init"
          value={editCurrentAddress.middle_init}
                onChange={changeHandler}
            />
          </FormGrid>
          <FormGrid item xs={12} md={5}>
            
              <TextField
                label="Last Name"
              id="last-name"
              name="last_name"
              type="last-name"
              placeholder="Snow"
              autoComplete="last name"
                required
                value={editCurrentAddress.last_name}
                onChange={changeHandler}
            />
          </FormGrid>
          <FormGrid item xs={12}>
            
              <TextField
                label="Address Line 1"
              id="address1"
              name="address_line1"
              type="address1"
              placeholder="Street name and number"
              autoComplete="shipping address-line1"
                required
                value={editCurrentAddress.address_line1}
                onChange={changeHandler}
            />
          </FormGrid>
          <FormGrid item xs={12}>
            
              <TextField
                label="Address Line 2"
              id="address2"
              name="address_line2"
              type="address2"
              placeholder="Apartment, suite, unit, etc. (optional)"
              autoComplete="shipping address-line2"
                
                value={editCurrentAddress.address_line2}
                onChange={changeHandler}
            />
          </FormGrid>
          <FormGrid item xs={5}>
            
              <TextField
                label="City"
              id="city"
              name="city"
              type="city"
              placeholder="New York"
              autoComplete="City"
                required
                value={editCurrentAddress.city}
                onChange={changeHandler}
            />
          </FormGrid>
          <FormGrid item xs={4}>
       <FormControl required sx={{  minWidth: 120, maxWidth: 150 }}>     
        <InputLabel id="demo-simple-select-required-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
           value={editCurrentAddress.state}
                 defaultValue={allStates.state}
          label="State"
          onChange={handleStateChange}
        >
                {allStates.map(function (state, ) {
                  return (
                    <MenuItem key={state.abbreviation} value={state.abbreviation}>{state.name}</MenuItem>
                  )
                })
                }
        </Select>
 </FormControl>

          </FormGrid>
          <FormGrid item xs={3}>
           
              <TextField
                label="Zip"
              id="zip"
              name="zip"
              type="zip"
              placeholder="12345"
              autoComplete="shipping postal-code"
                required
                value={editCurrentAddress.zip}
                onChange={changeHandler}
            />
          </FormGrid>
          <FormGrid item xs={12}>
           
              <TextField
                label="Phone #"
              id="Phone_num"
              name="Phone_num"
              type="text"
              placeholder="phone number"
              autoComplete="pnone_num"
                required
                value={editCurrentAddress.Phone_num}
                onChange={changeHandler}
              />
            </FormGrid>
             <FormGrid item xs={12}>
              <TextField
                label="Comment"
              id="comments"
              name="comments"
              type="text"
              placeholder="comments"
              autoComplete="comments"
                minRows = "3"
                value={editCurrentAddress.comments}
                onChange={changeHandler}
              />
            </FormGrid>

            <FormControlLabel 
               sx={{
          margin: '5px auto',
          display: "flex"
        }}
          value="top"
          control={<Switch checked={checked} onChange={handleswitch}  />}
          label="Default Address"
          labelPlacement="top"
        />
             <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              value="canc"
              name="canc"
              onClick={handleSubmit}
            >
              Canc
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              value="update"
              name="update"
              onClick={handleSubmit}

            >
              update
            </Button>
           
        </Grid>
      }
        </Box>
    </Container>
          );
}