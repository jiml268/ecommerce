import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/userHooks';
import { useState } from 'react';
import { allOrders } from '../../redux/orders/ordersOperators';
import css from "./allOrders.module.css"
import PropTypes from 'prop-types';

function ConvertDate({ orderdate }) {
  const formattedDate = new Date(orderdate).toLocaleDateString();

  return (
    <div key={orderdate}>
      Order date:  {formattedDate}
      
    </div>
  );
}




function AllOrders() {
    const dispatch = useDispatch()
    const { getUserId } = useAuth()
    const [listOrders, setListOrders] = useState(null)
    const [listImages, setListImages] = useState(null)
    useEffect(() => {
      const getAllOrders = async () => {
        const response = await dispatch(allOrders({ id: getUserId, }))
          setListOrders(response.payload.data.ordersList)
          setListImages(response.payload.data.orderImages)
         
        }

        getAllOrders().catch(console.error);
    }, [dispatch, getUserId])

  const showDetails = (value) => {
console.log(value)
  }
  
  const  ShowImage =({ orderId, ordernum}) => {
    const screenWidth = window.innerWidth;
    console.log(screenWidth)
    const numOfImages = Math.floor((screenWidth * .8) / 100)-1
    console.log(numOfImages)
    return (
      <>
        {listImages.filter((image) => orderId === image.orderId).map((images, index) => (
          index < numOfImages &&
          <div key={index} className={css.showImage}>
            <img className={css.productImage} src={window.location.origin + `/images/${images.imageName}`} onClick={() => showDetails(images.ordernum)} key={`${images.imageName}${index}`} />
                   
          </div>
        ))
        } 
        {listImages.filter((image) => orderId === image.orderId).length > numOfImages &&
          <button type="buttn" onClick={() => showDetails(ordernum)} > 
            +{listImages.filter((image) => orderId === image.orderId).length -numOfImages }
        </button>
         }
    </>
  )
  }

  return (
      
    <>
      {listOrders &&
        
        <div className={css.container}>
          <h2> Order History</h2>
          {listOrders.map((item, index) => (
           <div className={css.ordersection} key= {`ordersection${index}`}>
              <div className={css.header}>
              <p>
                Order Number:  {item.ordernum}
                </p>
                <button type = "button" onClick={() =>showDetails(item.ordernum)} className={css.detailButton}> Show details</button>
                </div>
              
                 <ConvertDate orderdate={item.orderdate} />
               < p>
                Total Amount:  ${item.total_sum.toLocaleString('en-US')}
                
              </p>
              <div className={css.showImages}>
                <ShowImage orderId={item.orderId} ordernum={item.ordernum} />
                
                </div>
            </div>
          ))}
        </div>
      }
        </>
    )
}


ConvertDate.propTypes = {
  orderdate: PropTypes.string,
  

};

AllOrders.propTypes = {
  orderId: PropTypes.string,
  ordernum: PropTypes.string,

};



export default AllOrders
