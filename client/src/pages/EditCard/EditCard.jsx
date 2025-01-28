import PropTypes from "prop-types"
// import css from './editCard.module.css'
import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Address from "../../components/Address/Address";
import { useAuth } from "../../hooks/userHooks";
import { useDispatch } from "react-redux";
import { updateCard } from "../../redux/payments/paymentsOperators";
import { removeCard } from "../../redux/payments/paymentsOperators";

export default function EditCard() {
  const location = useLocation();
      const { getUserEmail } = useAuth();
    const dispatch = useDispatch()

    const [currectInfo, setCurrentInfo] = useState(null)
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const [open, setOpen] = useState(false)
   const nav = useNavigate()
  console.log(location.state.cardInfo[0])
    console.log(location.state.cardInfo[0].id)

    useEffect(() => {
    if (location.state.cardInfo)   {  
      setCurrentInfo({
    id: location.state.cardInfo[0].id,
    last4: location.state.cardInfo[0].card.last4,
    name: location.state.cardInfo[0].billing_details.name,
    exp_month: location.state.cardInfo[0].card.exp_month,
    exp_year: location.state.cardInfo[0].card.exp_year,
    city: location.state.cardInfo[0].billing_details.address.city,
    country: location.state.cardInfo[0].billing_details.address.country,
    line1: location.state.cardInfo[0].billing_details.address.line1,
    line2: location.state.cardInfo[0].billing_details.address.line2,
    postal_code: location.state.cardInfo[0].billing_details.address.postal_code,
    state: location.state.cardInfo[0].billing_details.address.state
    })
        }
       

    }, [location.state.cardInfo,]
    )
    let years = []
     var currentTime = new Date()
        var currentyear = currentTime.getFullYear()
        for (let i = 0; i < 10; i++){
            years.push(currentyear+i)
        }

     const mthchange = (e) => {
        console.log(e.target.value)
    setCurrentInfo({
      ...currectInfo,
      exp_month: e.target.value,
    });
    }

      const yrchange = (e) => {
        console.log(e.target.value)
    setCurrentInfo({
      ...currectInfo,
      exp_year: e.target.value,
    });
    }
    
    const infochange = (e) => {
        console.log(e.target)
                console.log(e.target.name)

        const { name, value } = e.target;
                        console.log(name)
                console.log(value)

    setCurrentInfo({
      ...currectInfo,
      [name]: value,
    });
    }

    const handleSubmit = e => {
      e.preventDefault();
      dispatch(updateCard({userEmail:getUserEmail , currectInfo:currectInfo }))
    console.log("submit")
}
    
  const cancUpdate = () => {
     nav("/cardList")
  }

  const handleClose = e => {
    console.log(e.target.value)
    if (e.target.value === 'yes') {
 dispatch(removeCard({currectInfo:currectInfo }))
    }
      setOpen(false)
  }


    const deleteCard = e => {
      e.preventDefault();
      setOpen(true)
}
  

    return (
 <Container component="main" maxWidth="xs">
      <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
            >
                
                {currectInfo &&
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              {console.log(currectInfo)}
                         <Typography component="h1" variant="h5">
            ....{currectInfo.last4}
          </Typography>      
                        <Typography component="h1" variant="h5">
            Name on the card
          </Typography>
                         <Grid container spacing={2}>
             <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                                    label="name"
                                    name="name"
                autoComplete="name"
                value={currectInfo.name}
                onChange={infochange}
                />
                </Grid>
                  
                <Typography component="h1" variant="h5">
            Expiration date
                            </Typography>
  <Grid>                          
<FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Month</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={currectInfo.exp_month}
          label="Month"
        onChange={mthchange}
              data-my-value="exp_month"                          
                                    
                                >
            {months.map((month, index) => {
                            return (
                                <MenuItem key={index} value={month} name="exp_month" >{month}</MenuItem>
                            )

                        })
                        }                         
        </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={currectInfo.exp_year}
          label="Year"
                                    onChange={yrchange}
                                    
                                >
            {years.map((year, index) => {
                            return (
                                <MenuItem key={index}  name="exp_year" value={year}>{year}</MenuItem>
                            )

                        })
                        }                         
        </Select>
  </FormControl>
                    </Grid>
                < Address currectInfo={currectInfo} infochange={infochange} />
                                
                        </Grid>
                         <Grid> 
                <Button type="submit" >Update</Button>
                 <Button type="button"onClick={deleteCard} >Delete card</Button>
                 <Button type="button" onClick={cancUpdate} >cancel</Button>
                                </Grid>
                        
             </Box>
            }
             </Box>
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete credit card?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are you sure you want to delete this card?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} value="yes" autoFocus>yes</Button>
          <Button onClick={handleClose}  value="canc">
            cancel
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
     
    )
}

EditCard.propTypes = {
    cardInfo: PropTypes.array,
  
};