import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { retreiveProfile, updateProfile  } from '../redux/user/userOperators';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';
import validator  from 'email-validator'
import { useAuth } from '../hooks/userHooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const dispatch = useDispatch();
  const nav = useNavigate()
    const { getUserId } = useAuth();

    const [profileData, setProfileData] = useState(null)
     const [currentData, setCurrentData] = useState(null)
    useEffect(() => {
        const getProfile = async () => {
          const result = await dispatch(retreiveProfile({ id: getUserId }))
          console.log(result)
            if (result.payload.data.code === 200){
              const getData = result.payload.data.data[0][0]
              console.log('getData', getData)
                setProfileData({id: getData.id, email: getData.email, first_name:  getData.first_name, last_name:  getData.last_name,phone_num:  getData.phone_num})
                setCurrentData({id: getData.id,email: getData.email, first_name:  getData.first_name, last_name:  getData.last_name,phone_num:  getData.phone_num})
            }
        }

        getProfile()

    }, [dispatch, getUserId])    

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

    
    const changeHandler = e => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value,
        });
    }

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (e.target.value === "canc") {
        setProfileData(currentData)
        nav('/')
          return
}

    if (profileData.email === "" || profileData.first_name === '' || profileData.last_name === '' || profileData.phone_num === '' )
      {
       toast.warning("All fields must be filled out", 
            toastOptions);
        return
    }
    const regex = /^([+]?1[ -]?)?\d{3}[ -]?\d{3}[ -]?\d{4}$/;
      if( !regex.test(profileData.phone_num) ){
      toast.warning("Invalaid phone number format.", 
            toastOptions);
        return
    }
    
    if (!validator.validate(profileData.email)) {
       toast.warning("Invalid Email format", 
            toastOptions);
        return
    }
    const response = await dispatch(updateProfile(profileData));
    
   if (response.payload.data.code === 200) { 
 toast.success("User Profile has been updated.", 
   toastOptions);
      nav('/')
     return
    }
    if (response.payload.data.code === 400) { 
       const message = response.payload.data.message
 toast.success(message, 
   toastOptions);
        return
    }
  }

  return (profileData &&
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
           Profile information for User {profileData.first_name}
          </Typography>
          <Box  sx={{ mt: 3 }}>
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
                value={profileData.first_name}
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
                value={profileData.last_name}
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
                value={profileData.phone_num}
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
                value={profileData.email}
                onChange={changeHandler}
                />
              </Grid>
            </Grid>
            <Button
            type="button"
            onClick={handleSubmit}
              value="update"
              variant="contained"
              sx={{ mt: 3, mb: 2, mr: 10 }}
            >
              Update Profile
            </Button>
            <Button
              type="button"
            onClick={handleSubmit}
              value="canc"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      
      </Container>
   
  )
}

export default UserProfile