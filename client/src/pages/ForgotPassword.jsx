import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
    Card,
    CardContent
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import validator  from 'email-validator'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { resetPassword, } from '../redux/user/userOperators'; 

function ForgotPassword() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')

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
        const { value } = e.target;
        setEmail(value);
    }

    const handleSubmit = async (e) => {
 e.preventDefault();
        if (e.target.value === "cancel") {
            navigate("/signIn")
        } else {
if (!validator.validate(email)) {
       toast.warning("Invalid Email format", 
            toastOptions);
        return
    }

    }

          let charset = "";
        let newPassword = "";
 
        charset += "!@#$%^&*()";
        charset += "0123456789";
        charset += "abcdefghijklmnopqrstuvwxyz";
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 
        for (let i = 0; i < 8; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
            } 
            const NewPassword = { password: newPassword, email: email }   
        const result = await dispatch(resetPassword(NewPassword))    
        if (result.payload.data.code === 200) {
            toast.success("Password has been successfully changed.  An email with your new password has been sent.", 
          toastOptions);
        navigate("/signIn")
        }
        }

    

    return (<>
    <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Card sx={{ boxShadow: "4" }}>
                    <CardContent sx={{ m: 3 }}>
                        <Avatar sx={{
                            m: "auto",
                            bgcolor: "primary.main"
                        }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1"
                            variant="h5" sx={{ mt: 1 }}>
                            Forgot Password
                        </Typography>

                        <Box component="form"
                            onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={changeHandler}
                            />
                            <Button
                                type="submit"
                                
                                variant="contained"
                                sx={{ mt: 3, mb: 2, mr: 15 } }
                                value="submit"
                            
                            >
                                Reset Password
                            </Button>
                            <Button
                                type="submit"
                                
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                value = "cancel"
                            >
                                Cancel
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    </>)
}

export default ForgotPassword