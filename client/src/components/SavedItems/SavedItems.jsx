import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from '../../hooks/userHooks';
import { useState } from "react";
import { showSaved } from '../../redux/cart/cartOperators'
import {  Typography,  } from '@mui/material';
import css from './savedItems.module.css';



const SavedItems = () => {
    const dispatch = useDispatch()
    const { getUserId } = useAuth()
    const [showItems, setShowItems] = useState(null)
        const [showImages, setShowImages] = useState(null)

    

   useEffect(() => {
       const getAllsaved = async() => {
           const retrieveSaved = await dispatch(showSaved({ id: getUserId }))
          console.log(retrieveSaved)
           setShowItems(retrieveSaved.payload.data.items)
           setShowImages(retrieveSaved.payload.data.images)

       } 

       getAllsaved()
       
       
   }, [dispatch, getUserId])
    
   
    return (
        <>
            {showItems && <div>
                {console.log(showItems)}
                {console.log(showImages)}


                <Typography variant="h4" component="div">
                    Saved Items
                </Typography>
                {showItems.map((item, index) => {
                    { console.log(item) }
                    { console.log(showImages) }

                    const imageindex = showImages.findIndex(iteminfo => iteminfo.ProductID === item.ProductID && iteminfo.colorID === item.colorID)
                    const showimage = imageindex >= 0 ? window.location.origin + `/images/${showImages[imageindex].imageName}` : `/images/Image-Coming-Soon.png}`
                    {console.log('showimage', showimage)}
                    {console.log('imageindex', imageindex)}


                                    return (
                                        <div  key={index}>
                                            <div key={index} className={css.productInfo}>
                                                <div className={css.itemSection} >
                       
                                                    <div className={css.imageSection} >
                                                        <img src={showimage} alt='product image' className={css.productImage} />
                                                    </div>
                                                    <div className={css.infoSection}>
                                                        <h3 className={css.infoText}>{item.ProductName}</h3>
                                                        {item.colorName && <p className={css.infoText}>Color: {item.colorName}</p>}
                                                        {item.sizeName && <p className={css.infoText}>Size: {item.sizeName}</p>}
                                                    </div>
                                                    <div className={css.priceSection}>
                                                        
                    
                                                        <h4>${!item.salepercent ? (item.price * item.quantity).toFixed(2).toLocaleString('en-US') : ((item.price - (item.price * item.salepercent).toFixed(2)) * item.quantity).toLocaleString('en-US')}</h4>
                                                        {item.quantity > 1 && <p> ${(item.price - (item.price * item.salepercent).toFixed(2).toLocaleString('en-US'))} each </p>}
                                                        {item.salepercent && <p className={css.sale}>${item.price} each</p>}
                    
                                                        {item.salepercent && <p><span className={css.saveText}>You save:  </span>${((item.price * item.salepercent).toFixed(2) * item.quantity).toFixed(2).toLocaleString('en-US')}</p>}
                                                        <div>
                                                            
                                                            {/* <button type='button' onClick={removeClicked} className={css.buttonOptions} value={item.sku}>Remove</button> */}
                    
                                                            <div >
                                                                
                                                                <button type='button' disabled= {true} >Quantity: {
                                                                    item.quantity
                                                                }
                                                                </button >
                                                              
                                                               
                                                            </div>
                    
                                                        </div>
                                                
                                                
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                })
                }
            </div>
            }

        </>
    )
}


export default SavedItems;