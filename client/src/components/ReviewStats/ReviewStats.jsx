import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getReviewsStats } from '../../redux/review/reviewOperators';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { LinearProgress } from '@mui/material';
import css from './reviewStats.module.css'
import {isMobile} from 'react-device-detect';
import ShowReviews from '../../pages/ShowReviews/ShowReviews';

const ReviewStats = ({ productID }) => {
    const dispatch = useDispatch()
    const [productReviews, setProductReviews] = useState(null)
    const [totals, setTotals] = useState(null)
    const [totalScore, setTotalScore] = useState(0)
    const [countReviews, setCountReviews] = useState(0)
    const [numOfReviews, setNumOfReviews] = useState(0)
const [showAllReviews, setShowAllReviews] = useState(false)
const [starRatingtoShow, setStarRatingtoShow] = useState(0)


    useEffect(() => {
        const getAllreviews = async () => {
            const response = await dispatch(getReviewsStats({ productID: productID }))
  
            if (response.payload.data.reviewStats.length !== 0) {
              
                setProductReviews(response.payload.data.reviewStats)
                setTotals(response.payload.data.reviewTotals)
                setTotalScore(response.payload.data.reviewTotals.reduce((n, { sum }) => n + (sum * 1), 0))
                setCountReviews(response.payload.data.reviewTotals.reduce((n, { count }) => n + count, 0))
                setNumOfReviews(response.payload.data.reviewStats.filter(item => item.review !== null).length)
                
            }
        }
        getAllreviews()
    }, [dispatch, productID]
    )

    const showReviews = (e) => {
        setStarRatingtoShow(e.target.value)
        setShowAllReviews(!showAllReviews)
                
    }

    const CreateLine = ({ numofstars }) => {
    
               
                const indexNum = totals.findIndex(tot => tot.rating === numofstars)
                return (
                    <div className={css.lineSection} >
                        <button type='button' className={css.rateButton} onClick={showReviews} value={numofstars}> {numofstars} {numofstars > 1 ? "stars" : ' star    '}</button>
                        {/* <p className={css.starRating}> {numofstars} stars</p> */}
                        <LinearProgress  sx={{ width: isMobile?"100px":"200px" }}
                            variant="determinate"
                            value={indexNum === -1 ? 0 : ((totals[indexNum].count / countReviews) * 100)}
                        />
                        <p className={css.percent}>{indexNum !== -1 ? ((totals[indexNum].count / countReviews) * 100).toFixed(2) : 0}%</p>
                        <p className={css.numbers}>{indexNum !== -1 ? (totals[indexNum].count).toLocaleString('en-US') : 0}</p>
                    </div>
                )
            
        }
    
        


    

    return (
        <>   
            <div className={css.rateSection}>
                {productReviews ?
                    <div>
                    <div>
                        <h2>Customer ratings & reviews</h2>
                        <h4> {(totalScore / countReviews).toFixed(2)} out of 5</h4>
                        <Stack spacing={1} alignItems='center' flexDirection='row'>
                            <Rating name="half-rating" defaultValue={totalScore / countReviews} precision={0.5} readOnly />
                                <p style={{ marginLeft: "10px" }}> {productReviews.length} ratings | {numOfReviews} reviews </p>
                                <button type='button' onClick={showReviews} value={0}> {showAllReviews ? "Hide Reviews" : "View all reviews"}</button>

                        </Stack>
                    </div>
                    
                <div >
                    <CreateLine numofstars={5} />
                    <CreateLine numofstars={4} />
                    <CreateLine numofstars={3} />
                    <CreateLine numofstars={2} />
                    <CreateLine numofstars= {1} />
                        </div>
                    </div> :
                    <div>
                         <h2>Customer ratings & reviews</h2>
                        <p>No Rating or reviews for this product</p>
                        </div>
                }
            </div>
            <div>
                {showAllReviews && productReviews && < ShowReviews starNum={starRatingtoShow} productReviews={productReviews} />}
                </div>
        </>
    )

}

ReviewStats.propTypes = {
    productID: PropTypes.number,
    numofstars: PropTypes.number,
};


export default ReviewStats;