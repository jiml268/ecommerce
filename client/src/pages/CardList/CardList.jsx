import { useAuth } from "../../hooks/userHooks";
import { getallCards } from "../../redux/payments/paymentsOperators";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import cardLogos from '../../svg/cardLogos.svg'

export default function Payment() {
    const dispatch = useDispatch()
    const { getUserEmail } = useAuth();
    const [retrieveCards, setRetrieveCards] = useState(null)
        const [ defaultCard, setDefaultCard ] = useState(null)

    
    useEffect(() => {
        const striprCards = async () => {
            const respose = await dispatch(getallCards({userEmail: getUserEmail}))
           
            setRetrieveCards(respose.payload.data.allCards.data)
            setDefaultCard(respose.payload.data.defaultPaymentMethodId)

        }

        striprCards()
     
      }, [dispatch, getUserEmail, setRetrieveCards]
    )   

    const showLogo = (cardtype) => {
        
               

        switch (cardtype) {
           
            case "visa":
               
                return (
                    <div>
                    <svg >
                        <use href={cardLogos + `#icon-visa`}></use>
                    </svg>
                        </div>
                )
            case "mastercard":
                 
                return (
                    <svg  >
                        <use href={cardLogos + `#icon-mastercard`}></use>
                    </svg>
                )
            case "American Express":
               
                return (
                    <svg  >
                        <use href={cardLogos + `#icon-amex`}></use>
                    </svg>
                )
            case "Discover":
                
                return (
                    <svg  >
                        <use href={cardLogos + `#icon-discover`}></use>
                    </svg>
                )
            default:
                
                return (
                    <svg >
                        <use href={cardLogos + `#icon-generic`}></use>
                    </svg>
                )
        }
    }

    const editClick = (e) => {
        console.log(e.target.value)



    }
      const defaultClick = (e) => {
        console.log(e.target.value)


        
    }
    return (
        <>
            {retrieveCards && retrieveCards.map((card) => {
                return(
                    <div key={card.id}>
                       
                        {showLogo(card.card.brand)}   
                        <div>
                        < button onClick={editClick} value={card.id}>Edit</button>
                        <button onClick={defaultClick} value={card.id} disabled={defaultCard === card.id}>{defaultCard === card.id ? "Default" : "Set as Default"}</button>
                        </div>
                            <p>......<span>{card.card.last4}</span></p>
                        <p>{card.billing_details.name}</p>
                   
                    </div>
                )
             })}

          
    
            
        </>
    )
}
