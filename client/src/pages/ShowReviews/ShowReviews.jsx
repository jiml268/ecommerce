import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Select from 'react-select'
import css from './showReviews.module.css'
   import Rating from '@mui/material/Rating';

const stars = [
  { value: 5, label: '5 Stars' },
  { value: 4, label: '4 Stars' },
  { value: 3, label: '3 Stars' },
  { value: 2, label: '2 Stars' },
 { value: 1, label: '1 Star' },
]

const sortOtions = [{ label: "Date newest to oldest", value: "datenew" },
  { label: "Date oldest to newest", value: "dateold" },
  { label: "Rating highest to lowest", value: "ratinghigh" },
  { label: "Rating lowest to highest", value: "ratinglow" }
]


const ShowReviews = ({ starNum, productReviews }) => {


    const [reviewToShow, setReviewToShow] = useState([])
    const [sortBy, setSortBy ] = useState({ label: "Date newest to oldest", value: "datenew" })
  const [showRating, setshowRating] = useState([]);


  useEffect(() => {
    
    if (starNum !== "0") {
      setReviewToShow(productReviews.filter((review) => review.rating === starNum * 1 && review.review !== null))
      const starText =  starNum> 0 ? 'Stars' : 'Star'
    
      setshowRating(prevArray => [...prevArray, { value: starNum * 1, label: `${starNum} ${starText}`}]);
      
        } else {
             setReviewToShow( productReviews.filter((num) => num.review !== null))
  
        }
        setSortBy({ label: "Date newest to oldest", value: "datenew" })
    }, [productReviews, starNum])

  const handleChange = (selected) => {
    
 setshowRating(selected)
   
    
    if (selected.length === 0) {
      setReviewToShow(productReviews.filter((num) => num.review !== null))
    } else {
      setReviewToShow([])
      selected.map((star) => (
        setReviewToShow(prev =>  [...prev, ... productReviews.filter((num) => num.rating === star.value && num.review !== null)])
      ));

    }
    

  };
  
  const handleSort = (selected) => {
   
    
setSortBy(selected)
    if (selected.value === 'datenew') {
      const sortedItems = [...reviewToShow].sort((a, b) => b.createDate - a.createDate);
      setReviewToShow(sortedItems);
     
    }
    if (selected.value === 'dateold') {
 const sortedItems = [...reviewToShow].sort((a, b) => a.createDate - b.createDate);
      setReviewToShow(sortedItems);
    
    }
    
    if (selected.value === 'ratinghigh') {
      const sortedItems = [...reviewToShow].sort((a, b) => b.rating - a.rating);
      setReviewToShow(sortedItems);
     
    }

    if (selected.value === 'ratinglow') {
      const sortedItems = [...reviewToShow].sort((a, b) => a.rating - b.rating);
      setReviewToShow(sortedItems);
     

    }


  }

  const formattedDate = (createDate) => {
    const dateObject = new Date(createDate);
    return (
      dateObject.toLocaleDateString()
    )

  }
    return (
        <>
        <div className={css.optionSection}>  
          <div className={css.optionGroup}>
            <h4>Ratings:</h4>
<Select options={stars} value={showRating} isMulti onChange={handleChange}  />
          </div>  
          <div className={css.optionGroup}>
            <h4>Sort by:</h4>
            <Select options={sortOtions} onChange={handleSort} value={sortBy}  />
      </div>
     
          
        </div>
        <div>
          {reviewToShow.map((review, index) => (
            <div key={`review${index}`} className={css.reviewSection}>
              
   <p key={`date${index}`}>{formattedDate(review.createDate)}</p>
              <Rating name="half-rating" value={review.rating} precision={0.5} readOnly />
              <p >{review.name}</p>
              <div>
              <p className={css.leftAlign}>{review.title}</p>
              <p className={css.leftAlign}>{review.review}</p>
</div>

              </div>
      ))
    }
    </div>
        </>
    )
}
ShowReviews.propTypes = {
    starNum: PropTypes.string,
    productReviews: PropTypes.array,
};


export default ShowReviews;