import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { userRegister } from '../redux/user/userOperators';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';
import validator  from 'email-validator'


function Registration() {
    const dispatch = useDispatch();

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

    const [registrationData, setRegistrationData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        phone_num: "",
        password: "",
        repeatPassword: ""
    })
    const changeHandler = e => {
        const { name, value } = e.target;
        setRegistrationData({
            ...registrationData,
            [name]: value,
        });
    }

  const handleSubmit = async (e) => {
        e.preventDefault();
    if (registrationData.email === "" || registrationData.first_name === '' || registrationData.last_name === '' || registrationData.phone_num === '' || registrationData.password === '' || registrationData.repeatPassword === "")
      {
       toast.warning("All fields must be filled out", 
            toastOptions);
        return
    }
    const regex = /^([+]?1[ -]?)?\d{3}[ -]?\d{3}[ -]?\d{4}$/;
      if( !regex.test(registrationData.phone_num) ){
      toast.warning("Invalaid phone number format.", 
            toastOptions);
        return
    }
    

      if (registrationData.password !== registrationData.repeatPassword) {
         toast.warning("Password and Retype Password must be the same", 
            toastOptions);
        return
    }
    if (!validator.validate(registrationData.email)) {
       toast.warning("Invalid Email format", 
            toastOptions);
        return
    }
    const response = await dispatch(userRegister(registrationData));
    
   if (response.payload.data.code === 201) { 
 toast.success("Registration completed.  Please check your email for a varificaion email.", 
   toastOptions);
     resetData()
     return
    }
    if (response.payload.data.code === 400) { 
       const message = response.payload.data.message
 toast.success(message, 
   toastOptions);
        return
    }
  }
  
  const resetData = () => {
    setRegistrationData({
       email: "",
       first_name: "",
       last_name: "",
       phone_num: "",
       password: "",
       repeatPassword: ""
     })
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
          
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                autoFocus
                value={registrationData.first_name}
                 onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                autoComplete="last_name"
                value={registrationData.last_name}
                onChange={changeHandler}
                />
            </Grid>
             <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone_num"
                  label="Phone Number"
                  name="phone_num"
                autoComplete="phone_num"
                value={registrationData.phone_num}
                onChange={changeHandler}
                />
              </Grid>
            
             <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                autoComplete="email"
                value={registrationData.email}
                onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                autoComplete="new-password"
                value={registrationData.password}
                onChange={changeHandler}
                />
            </Grid>
             <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="repeatPassword"
                  label="Retype Password"
                  type="password"
                  id="repeatPassword"
                autoComplete="repeat-password"
                value={registrationData.repeatPassword}
                onChange={changeHandler}
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      
      </Container>
   
  )
}

export default Registration