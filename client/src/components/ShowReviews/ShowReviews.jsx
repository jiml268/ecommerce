import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getReviews } from '../../redux/review/reviewOperators';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { LinearProgress } from '@mui/material';
import css from './showReviews.module.css'


const ShowReviews = ({ productID }) => {
    const dispatch = useDispatch()
    const [productReviews, setProductReviews] = useState(null)
    const [totals, setTotals] = useState(null)
    const [totalScore, setTotalScore] = useState(0)
    const [countReviews, setCountReviews] = useState(0)

    


    useEffect(() => {
        const getAllreviews = async () => {
            const response = await dispatch(getReviews({ productID: productID }))
          

            if (response.payload.data.showReviews.lenght !== 0) {
              
                setProductReviews(response.payload.data.showReviews)
                setTotals(response.payload.data.reviewTotals)
                setTotalScore(response.payload.data.reviewTotals.reduce((n, { sum }) => n + (sum * 1), 0))
                setCountReviews(response.payload.data.reviewTotals.reduce((n, { count }) => n + count, 0))

            }
        }
        getAllreviews()
    }, [dispatch, productID]
    )

    const showReviews = (e) => {
        console.log(e.target.value)
    }

    const CreateLine = ({ numofstars }) => {
    
               
                const indexNum = totals.findIndex(tot => tot.rating === numofstars)
                return (
                    <div className={css.lineSection} >
                        <button type='button' className={css.rateButton} onClick={showReviews} value={numofstars}> {numofstars} stars</button>
                        {/* <p className={css.starRating}> {numofstars} stars</p> */}
                        <LinearProgress  sx={{ width: "200px" }}
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
            {productReviews && <div className={css.rateSection}>
                <div>
                <h2>Customer ratings & reviews</h2>
                <h4> {(totalScore / countReviews).toFixed(2)} out of 5</h4>
    <Stack spacing={1} alignItems= 'center'>
    <Rating name="half-rating" defaultValue={totalScore / countReviews} precision={0.5} readOnly />
    </Stack>
</div>
                <div >
                    <CreateLine numofstars={5} />
                    <CreateLine numofstars={4} />
                    <CreateLine numofstars={3} />
                    <CreateLine numofstars={2} />
                    <CreateLine numofstars= {1} />
                    </div>
            </div>}
        </>
    )

}

ShowReviews.propTypes = {
    productID: PropTypes.number,
    numofstars: PropTypes.number,
};


export default ShowReviews;