import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import { getAllAddress } from "../../redux/addresses/addressOperators"
import { getID } from "../../redux/users/usersSelectors"
import { useLocation } from "react-router-dom";
import styles from "./AllAddresses.module.css"

function AllAddresses() {
 const dispatch = useDispatch()
    const userID = useSelector(getID)
    const location = useLocation();
    const data = location.state;
    const [showAddresses, setShowAddresses] = useState([]

    )
    useEffect(() => {  
             const getAddtressType = {address_type: data.type, useID: userID }
        console.log('getAddtressType', getAddtressType)

        const fetchData = async () => {
             
        
           
            const response = await dispatch(getAllAddress(getAddtressType))
            setShowAddresses(response.payload.data.data)
            console.log(response)
   
  }

 
  fetchData()
    .catch(console.error);
}, [dispatch,userID, data.type  ])

   
    return (
        <div>
            <h1> Your {data.type} Addresses</h1>
        <div className={styles.listAddresses}>
            {showAddresses.length > 0 &&
                showAddresses.map(function(address) {
      return (
          <div key={address.id}>
              <div className ={ styles.AddressBlock} style={{border: "1px solid black"}}>
              {address.default_addtress === 1 &&
                  <h3 className={styles.default}>Default</h3> 
              }
              <h3 style={{fontWeight: 800}}>{address.first_name} {address.middle_init} {address.last_name} </h3>
              <h3>{address.address_line1}</h3>
              <h3>{address.address_line2}</h3>
            <h3>{address.city},{address.state} {address.zip} </h3>
                  <h3>Phone number: </h3>
                   <h3>{address.Phone_num}</h3>
                  <button>edit</button>      
                  <button>remove</button>
                  {address.default_addtress !== 1 &&  <button>set as default</button>}

</div>
        </div>
      )
    })

        }
            </div>
            </div>
    )
}

export default AllAddresses