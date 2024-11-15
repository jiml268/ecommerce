import { useState } from "react"
import Payment from "../../components/Payment/Payment"
import Address from "../../components/Address/Address"
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

export default function CkeckOut() {
    const nav = useNavigate()



   

    const [page, setPage] = useState('ship')

    const init =  {
            city: "",
            line1: "",
            line2: "",
            name: "",
            zip: "",
             state: "",
            sameAddress: false
        }

 const [shippingAddress, setShippingAddress] = useState(init)
    const [billingAddress, setBillingAddress] = useState(init)

    const buttonClick = e => {
     




        if (page === "bill" && e.target.value === "pay") {
         const filledOut = 
            billingAddress.name !== "" && billingAddress.line1 !== "" && billingAddress.city !== "" && billingAddress.state !== "" && billingAddress.zip !== "" 
         if (!filledOut) {
             toast.warning("Please fill out all the required fields",
                 toastOptions);
            
             return
         }       
    }
        if (page === "ship" && e.target.value !== "cart") {
          
        
         const filledOut = 
            shippingAddress.name !== "" && shippingAddress.line1 !== "" && shippingAddress.city !== "" && shippingAddress.state !== "" && shippingAddress.zip !== "" 
         if (!filledOut) {
             toast.warning("Please fill out all the required fields",
                 toastOptions);
            
             return
            }
              if (billingAddress.sameAddress) {
             setBillingAddress(shippingAddress)
         }
        }

        setPage(e.target.value)
        if (e.target.value === "cart") {
            nav('/cart')
        }

}


    const updateAddress = e => {
        console.log(e.target.name)
                console.log(e.target.value)

        const { name, value } = e.target;
        if (e.target.name === 'sameAddress') {
            if (billingAddress.sameAddress) {
                setBillingAddress(init)
            }
            else {
   setBillingAddress(prevInfo => ({
       ...prevInfo,
        city: shippingAddress.city,
            line1: shippingAddress.line1,
            line2: shippingAddress.line2,
            name: shippingAddress.name,
            zip: shippingAddress.zip,
             state: shippingAddress.state,
            sameAddress: true

}));
}
      return
        }
        
        if (page === 'bill') {
            setBillingAddress({
                ...billingAddress,
                [name]: value,
            })
        }
         if (page === 'ship') {
            setShippingAddress({
                ...shippingAddress,
                [name]: value,
            })
        }
    }

    return (
        <>
            {page === 'ship' &&
                <Address shippingAddress = {shippingAddress} updateAddress={updateAddress} page={page} buttonClick= {buttonClick} />
            }
             {page === 'bill' &&
                <Address billingAddress = {billingAddress} updateAddress={updateAddress} page={page} buttonClick= {buttonClick} />
            }
             {page === 'pay' &&
                <Payment buttonClick= {buttonClick} />
            }
            
        </>
    )
}