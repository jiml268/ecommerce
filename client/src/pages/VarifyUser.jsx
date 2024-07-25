import { userVerification } from "../redux/user/userOperators"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

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
         
 const queryParams = new URLSearchParams(window.location.search)
  const returnCode = queryParams.get("varification_code")
const returnEmail = queryParams.get("email")
console.log(returnCode)
    console.log(returnEmail)


function VarifyUser() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [message, SetMessage] = useState(null)
  const [code, SetCode] = useState(0)

 
useEffect(() => {
 
  const checkValidasion = async () => {
    
  
      const userVarify = { returnCode: returnCode, returnEmail: returnEmail }

    const response = await dispatch(userVerification(userVarify));
    SetCode(response.payload.data.code)
    console.log('response.payload.data.code', response.payload.data.code)
    switch (response.payload.data.code) {
      case 200:
         toast.success("You have successfully varified your account ", 
           toastOptions);
        SetMessage(null)
         navigate("/signIn");
         break
       case 404:
         toast.error("Invalid varification code for that email address. request a new code?", 
           toastOptions);
        SetMessage("Invalid varification code for that email address.  request a new code")
        break
      case 406:
         toast.error("No account was found for that email & code.  Please register to be able to sign in", 
           toastOptions);
        SetMessage("No account was found for that email & code.  Please register to be able to sign in")
         break
       case 409:
         toast.info("Your Account has been previously varified.", 
           toastOptions);
        SetMessage(null)
         navigate("/signIn");
         break
       case 410:
         toast.error("Your verification code has expired. Request a new code?", 
           toastOptions);
                SetMessage("Your verification code has expired. Request a new code")

         break
    default:
      toast.error("the default ran", 
            toastOptions);
  }
  }

  checkValidasion()
    .catch(console.error);
}, [dispatch, navigate ])
        
  const buttonClick = (e) => {
    if (e.target.value === "Yes") {
      if (code === 406) {
        navigate("/registration"); 
      } else {
        console.log("send new varification code")
      }
      
    } else
    {
       navigate("/");
      }
      
  }
  
  


  return (
    <>
      {message &&
        <>
          <h3>{message}</h3>
        <button onClick={buttonClick} value="Yes"> Yes</button>
        <button onClick={buttonClick} value = "No"> No</button>

        </>
      }
    </>
  )
}
export default VarifyUser