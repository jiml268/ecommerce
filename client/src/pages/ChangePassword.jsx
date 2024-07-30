import { useState } from 'react'
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';
import { updatePassWord, } from '../redux/user/userOperators'; 
import { LoggedOut } from  '../redux/user/userSlice'
import { useAuth } from '../hooks/userHooks'
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const navigate = useNavigate()
  const { loggedIn, getUserEmail } = useAuth();
  console.log("loggedIn", loggedIn)
    console.log("getUserEmail", getUserEmail)

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

const [newPassword, setNewPassword] = useState({oldPassword: "", newPassword: "", retypePassword: "", email: getUserEmail})

       const changeHandler = e => {
        const { name, value } = e.target;
        setNewPassword({
            ...newPassword,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
 e.preventDefault();
    if (newPassword.oldPassword === "" || newPassword.newPassword === '' || newPassword.retypePassword === '')
      {
       toast.warning("All fields must be filled out", 
            toastOptions);
        return
    } if ( newPassword.newPassword !== newPassword.retypePassword )
      {
       toast.warning("New password and retype password must be the same", 
            toastOptions);
        return
      }
      console.log(' useAuth',  useAuth)
      console.log(' getUserEmail', { getUserEmail })
    
      const result = await dispatch(updatePassWord(newPassword))
      console.log(result)
      if (result.payload.data.code === 200) {
        toast.success("Password has been successfully changed.  Please log in with with the New Password.", 
          toastOptions);
        dispatch(LoggedOut(false))
        navigate("/signIn")
        return
      }
      if (result.payload.data.code === 401) {
    toast.warning("Incorrect current password.  Please try again", 
          toastOptions);
      }
    }
    
    return(
        <>
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
           Change Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  name="oldPassword"
                  required
                  fullWidth
                  id="oldPassword"
                    label="Current Password"
                     type="password"
                autoFocus
                value={newPassword.oldPassword}
                 onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="newPassword"
                  label="New Password"
                  name="newPassword"
                type="password"
                value={newPassword.newPassword}
                onChange={changeHandler}
                />
            </Grid>
             <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="retypePassword"
                  label="Retype New Password"
                  name="retypePassword"
              type="password"
                value={newPassword.retypePassword}
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
              Submit
            </Button>
            
          </Box>
        </Box>
      
      </Container>
     
        </>
    )
}

export default ChangePassword