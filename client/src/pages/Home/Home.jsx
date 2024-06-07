
import Login from '../Login/Login'
import { useNavigate } from "react-router-dom";

function Home() {
const navigate = useNavigate();  
  const buttonClick = async e => {
    console.log(e.target.value)
    const addressType = {type: e.target.value}
   navigate("/alladdresses", { state: addressType });   
  }


 return (
   <div >
     <Login />
<button onClick={buttonClick} value="billing" name="billing" type="button">billing address</button>
<button onClick={buttonClick} value="shipping" name="shiping" type="button">shipping address</button>

     </div>
 )
}

export default Home