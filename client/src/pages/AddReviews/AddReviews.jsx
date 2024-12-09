import css from './addReviews.module.css';
import { useState } from 'react';
import { useLocation } from "react-router-dom";
import StarRatings from '../../components/StarRatings/StarRatings';
import WriteReview from '../../components/WriteReview/WriteReview';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createReview } from '../../redux/review/reviewOperators';
import { useAuth } from '../../hooks/userHooks';



const AddReviews = () => {
    const location = useLocation();
    const displatch = useDispatch()
    const nav = useNavigate()
  const { getUserId } = useAuth()
    
    const [value, setValue] = useState(null)
    const [productReview, SetProductReview] = useState({review: "", title: "", name: ""})
    
    const sku = location.state?.sku;
    const orderId = location.state?.orderId;
   


    const product = [{ imageName: "Apple MacBook Air-1.jpeg", ProductName: "Apple MacBook Air" }]
    
      const handleSubmit = async(e) => {
          e.preventDefault();
          const reviewInfo = { sku: sku, starValue: value, productReview: productReview, userID: getUserId }
          console.log(reviewInfo)
          await displatch(createReview(reviewInfo))
   

}

    const cancReview = () => {

       
        nav(`/orderdetails`, { state: { orderId: orderId } });
    }

    const setStarValue = e => {
        setValue(null)
        SetProductReview({review: "", title: "", name: ""})
        setValue(e.target.value)
    }

    const setReview = e => {
        const { name, value } = e.target;
    SetProductReview({
      ...productReview,
      [name]: value,
    });
    }

    return (
        <div className={css.container}>
            <div className={css.headerSection}>
                <h2>Write an item review</h2>
                <button type="button" onClick={cancReview}>cancel</button>
</div>
            <div>
                <img className={css.reviewImage} src={window.location.origin + `/images/${product[0].imageName}`} />
                <p>
{product[0].ProductName}
                </p>
                < StarRatings value={value} setStarValue={setStarValue} />
               
                {value &&
                    <WriteReview setReview={setReview} productReview={productReview} handleSubmit={handleSubmit} /> }
            </div>
    
        </div>
    )

}


export default AddReviews;




