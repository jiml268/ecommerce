import PropTypes from 'prop-types';
import css from './CartInfo.module.css';

export default function CartInfo({ currentCart, cartImages }) {
return (<>
        {console.log(currentCart)}
    {console.log(cartImages)}
     
      <div>
        {currentCart.map((item, index) => {
            const imageindex = cartImages.findIndex(iteminfo => iteminfo.ProductID === item.ProductID && iteminfo.colorID === item.colorID)
             const showimage = imageindex>=0?window.location.origin + `/images/${cartImages[imageindex].imageName}`:`/images/Image-Coming-Soon.png}`
            
            return (
                <div className={css.produceSection} key={index}>
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
                        <h4>${!item.salepercent ? (item.price * item.quantity).toLocaleString('en-US') : ((item.price-(item.price * item.salepercent).toFixed(2)) * item.quantity).toLocaleString('en-US')}</h4>
                        {item.quantity > 1 && <p> ${(item.price - (item.price * item.salepercent).toFixed(2).toLocaleString('en-US'))} each </p>}
                        {item.salepercent && <p className={css.sale}>${item.price.toLocaleString('en-US')} each</p>}

                        {item.salepercent && <p><span className={css.saveText}>You save:  </span>${((item.price * item.salepercent).toFixed(2) * item.quantity).toFixed(2).toLocaleString('en-US')}</p>}
                    </div>
                </div>   
               </div>
                        </div>
          )
        })
    }
        </div>
     
</>
)
}



CartInfo.propTypes = {
  currentCart: PropTypes.array,
    cartImages: PropTypes.array,
};