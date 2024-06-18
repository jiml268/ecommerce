import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import { getAllAddress, deleteAddress, updateDefault } from "../../redux/addresses/addressOperators"
import { getID } from "../../redux/users/usersSelectors"
import { useLocation } from "react-router-dom";
import styles from "./AllAddresses.module.css"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import NewAddress from '../../components/NewAddress/NewAddress'

function AllAddresses() {

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
const navigate = useNavigate();  
 const dispatch = useDispatch()
    const userID = useSelector(getID)
    const location = useLocation();
    const data = location.state;
    const [showAddresses, setShowAddresses] = useState([]

    )
    useEffect(() => {  
             const getAddtressType = {address_type: data.type, useID: userID }
        const fetchData = async () => {
             
        
           
            const response = await dispatch(getAllAddress(getAddtressType))
            setShowAddresses(response.payload.data.data)
   
  }

 
  fetchData()
    .catch(console.error);
    }, [dispatch, userID, data.type])
    
    const defaulClick = async(e) => {
        const defaultAddress = {address_type:  data.type,
     id_number: e.target.value,
            user_id: userID
        }
       const response = await dispatch(updateDefault(defaultAddress))
            
             if (response.payload.data.code === 200) {
               toast.success("Default Address has been updated", 
     toastOptions);  
             }
             const getAddtressType = { address_type: data.type, useID: userID }
              const getAdresses = await dispatch(getAllAddress(getAddtressType))
            setShowAddresses(getAdresses.payload.data.data)
         } 
    

     const addressClicked = async (e) => {
         const { name, value } = e.target
          let currentindex = e.target.getAttribute("data-id")
                    

         if (name === "remove") {
             const recordToDelete = { address_type: data.type, id_number: value }
             const response = await dispatch(deleteAddress(recordToDelete))
             
             if (response.payload.data.code === 200) {
               toast.success("Address has been deleted", 
     toastOptions);  
             }
             const getAddtressType = { address_type: data.type, useID: userID }
              const getAdresses = await dispatch(getAllAddress(getAddtressType))
            setShowAddresses(getAdresses.payload.data.data)
         }
         if (name === "edit") {
             const addressInfo = { address: showAddresses[currentindex], address_type: data.type, newOrUpdate: "Update" }
           
   navigate("/AddressForm", { state: addressInfo });    
         }
         
    }

   
    return (
        <div>
            <h1> Your {data.type} Addresses</h1>
            <div className={styles.addressConainer}>
           
                <div className={styles.listAddresses}>
                     <NewAddress taskData={data.type}/>
            {showAddresses.length > 0 &&
                showAddresses.map(function(address, index) {
      return (
          <div key={address.id}>
              <div className={styles.AddressBlock} >
                  <div className={styles.defaultBlock}>
              {address.default_addtress === 1 ?
                      <h3 className={styles.default}>Default</h3> :
                      <button className={styles.defaultButton} value={address.id} onClick={defaulClick}>set as default</button>
                      }
                  </div>
                  <div className={styles.showAddress}>
              <h3 style={{fontWeight: 800}}>{address.first_name} {address.middle_init} {address.last_name} </h3>
              <h3>{address.address_line1}</h3>
              <h3>{address.address_line2}</h3>
            <h3>{address.city},{address.state} {address.zip} </h3>
                  <h3>Phone number: </h3>
                      <h3>{address.Phone_num}</h3>
                      </div>
                  <div className={styles.buttonGroup}>
                  <button className={styles.addressButton} onClick={addressClicked} value={address.id} data-id={index} name = 'edit'>edit</button>      
                  <button  className={styles.addressButton} onClick={addressClicked} value={address.id} data-id={index} name ="remove">remove</button>
                 </div>

</div>
        </div>
      )
    })

        }
                </div>
                </div>
        </div>
        
    )
}

export default AllAddresses