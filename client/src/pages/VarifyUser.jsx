import { userVerification } from "../redux/user/userOperators"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

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

function VarifyUser() {
  const dispatch = useDispatch()
 
useEffect(() => {
 
  const checkValidasion = async () => {
    
  
      const userVarify = { returnCode: returnCode, returnEmail: returnEmail }

    const response = await dispatch(userVerification(userVarify));

    switch (response.payload.data.code) {
      case 200:
         toast.success("You have successfully varified your account ", 
            toastOptions);
         break
       case 404:
         toast.error("Verification code not found. send a new code?", 
            toastOptions);
        break
      case 406:
         toast.error("No account was found for that email & code.  Please register to be able to sign in", 
            toastOptions);
         break
       case 409:
         toast.info("Your Account has been previously varified.", 
            toastOptions);
         break
       case 410:
         toast.error("Your verification code has expired. send a new code?", 
            toastOptions);
         break
    default:
      toast.error("the default ran", 
            toastOptions);
  }


    console.log(response)
  }

  // call the function
  checkValidasion()
    // make sure to catch any error
    .catch(console.error);
}, [dispatch,  ])
        

  


  return (
    <>
          <h3>{returnCode}</h3>
            <h3>{returnEmail}</h3>

    </>
  )
}
export default VarifyUser