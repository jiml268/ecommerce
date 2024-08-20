import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/user/userOperators';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function SignIn() {
    const dispatch = useDispatch();
 const nav = useNavigate()
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

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })
  const changeHandler = e => {
    

        const { name, value } = e.target;
        setLoginData({
             ...loginData,
           [name]: value,
         });
    }

  const handleSubmit = async (e) => {
        e.preventDefault();
    if (loginData.email === "" || loginData.password === '' )
      {
       toast.warning("All fields must be filled out", 
            toastOptions);
        return
    }
   
    const response = await dispatch(userLogin(loginData));
    
      if (response.payload.data.code === 403 ||response.payload.data.code === 401 ) { 
       const message = response.payload.data.message
 toast.success(message, 
     toastOptions);
              resetData()
     return
      }
      if (response.payload.data.code === 401 ) { 
       const message = response.payload.data.message
 toast.success(message, 
     toastOptions);
     return
      }

      
    if (response.payload.data.code === 200) { 
       const message = response.payload.data.message
 toast.success(message, 
     toastOptions);
      resetData();
       nav('/')
        return
    }
  }
  
  const resetData = () => {
    setLoginData({
       email: "",
       password: "",
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
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
             <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                autoComplete="email"
                value={loginData.email}
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
                value={loginData.password}
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
              LogIn
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link href="ForgotPassword" variant="body2">
                  Forgot Password
              </Link>
            </Grid>
            <Grid item>
                <Link href="/registration" variant="body2">
                  Do not have an account? Sign Up
              </Link>
              
              </Grid>
            </Grid>
          </Box>
        </Box>
      
      </Container>
   
  )
}

export default SignIn