import {  useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, } from 'react-redux';
import { useCallback } from 'react';
import { getdetails } from '../../redux/orders/ordersOperators';
import css from "./orderDatails.module.css"

export default function OrderDatails() {
    const location = useLocation();
    const dispatch = useDispatch()
  
    const [orderInfo, setOrderInfo] = useState(null)
    const [orderDetails, setOrderDetails] = useState(null)
    const [stripeInfo, setStripeInfo] = useState(null)

    const getDetails = useCallback(async (orderId) => {
        if (!orderId) return;
        const response = await dispatch(getdetails({ orderId: orderId }));
        setOrderInfo(response.payload.data.orderInfo);
        setOrderDetails(response.payload.data.orderDetails);
setStripeInfo(response.payload.data.stripeInfo)
    }, [dispatch]);

    useEffect(() => {
        const orderId = location.state?.orderId;
        getDetails(orderId).catch(console.error);
    }, [getDetails, location.state?.orderId]);


    const CalcTotals = () => {
     let itemCnt = 0;
    let originalTot = 0;
    let discountTot = 0;
   
        let shipping = 0
        

        //  details.quantity > 1 && <p>details.sales_price !==details.origian_price

    orderDetails.forEach((element) => {
        itemCnt = element.quantity + itemCnt
        originalTot = originalTot + (element.origian_price * element.quantity)
        discountTot = discountTot + (element.sales_price * element.quantity)
            
        })    
        discountTot < 35 ? shipping = 6.99 : shipping = 0
        
        return (<div className={css.totalBox}>
            <p> Number of items: {itemCnt}</p>
            <p>{originalTot === discountTot ? "Price" : "Original Price"} ${originalTot.toFixed(2).toLocaleString('en-US')}</p>
            {originalTot !== discountTot && <p> sales: Price ${discountTot.toFixed(2).toLocaleString('en-US')}</p>}
            <p>Shipping: {shipping> 0?shipping.toFixed(2).toLocaleString('en-US'):"Free"}</p>
            <p>Order Total: ${(discountTot + shipping).toFixed(2).toLocaleString('en-US')}</p>
        </div>)
};

    return (
        <>
            <h1>Order details</h1>
            {orderInfo && <div>
                <div>
                    {console.log(stripeInfo)}
                    <h3> Purchase date: {new Date(orderInfo[0].orderdate).toLocaleDateString()}</h3>
                    <p>Order #: {orderInfo[0].ordernum}</p>
                    <p> {orderDetails.length}  items</p>
                    {stripeInfo && <div>
                        <h6>Shipping Address</h6>
                        <p>{`${stripeInfo.shipping.name}`}</p>
                        <p>{stripeInfo.shipping.address.line1}</p>
                        <p>{stripeInfo.shipping.address.line2}</p>
                        <p>{`${stripeInfo.shipping.address.city}, ${stripeInfo.shipping.address.state} ${stripeInfo.shipping.address.postal_code} `}</p>


                    </div>
                    }
                </div>
                {orderDetails.length > 0 &&
                    <div>
                        {orderDetails.map((details, index) => (
                            <div key={`order${index}`} className={css.ordersection}> 
                                <div key={`imageholder${index}`}>
<img className={css.showImage} src={window.location.origin + `/images/${details.imageName}`} key={`${details.imageName}${index}`} />
                                </div>
                                <div key={`details${index}`} className={css.detailSection}>
                                    <h4>{details.ProductName} </h4>
                                    <p>qty: {details.quantity}</p>
                                    {details.quantity > 1 && <p>{details.sales_price !==details.origian_price  && `Original`} Price: ${details.origian_price.toFixed(2).toLocaleString('en-US')} each</p>}
                                    {details.quantity > 1 && details.sales_price!==details.origian_price  && <p>sales Price: ${details.sales_price.toFixed(2).toLocaleString('en-US')}each</p>}
    
                                </div>
                                <div key={`totals${index}`} className={css.totalSection}>
                                    <p>Price: ${(details.origian_price * details.quantity).toFixed(2).toLocaleString('en-US')}</p>
                                    {details.sales_price !== details.origian_price &&
                                        <p>Sales Price: ${(details.sales_price * details.quantity).toFixed(2).toLocaleString('en-US')}</p>}
                                    <p>savings: ${((details.origian_price-details.sales_price)*details.quantity).toFixed(2).toLocaleString('en-US')}</p>
                                </div>
                            

                            </div>
    
))}
                        </div>
                }
                <div className={css.showTotals}>
    
                    <CalcTotals />
                    
                </div>
                

</div>
            } 
        </>
    )
}
