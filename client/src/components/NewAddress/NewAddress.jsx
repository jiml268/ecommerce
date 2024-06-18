import styles from "./NewAddress.module.css"
import plus from '../../images/plus.svg'
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { getID } from "../../redux/users/usersSelectors"
import { useSelector } from "react-redux"


function NewAddress({ taskData }) {
    const userID = useSelector(getID)
    const navigate = useNavigate();
    
    const NewClicked = async () => {
        const showAddresses = { first_name: " ", middle_init: "", last_name: "", address_line1: "", address_line2: "", city: "", state: "", zip: "", Phone_num: "", comments: "", default_addtress:0, user_id: userID }

       const addressInfo = { address: showAddresses, address_type: taskData, newOrUpdate: "New" }
           
   navigate("/AddressForm", { state: addressInfo });  
   
    }

    return (
        <>
            <button className={styles.NewAddressBlock} onClick={NewClicked}>
                <img className={styles.plus}  src={plus} alt="Plus Sign" />
        </button>
        
        </>   
    )

}
NewAddress.propTypes  = {
   taskData: PropTypes.string,
}

export default NewAddress