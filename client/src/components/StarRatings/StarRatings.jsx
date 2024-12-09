import css from './starRatings.module.css';
import Rating from '@mui/material/Rating';
import PropTypes from 'prop-types';


const StarRatings = ({value, setStarValue}) => {


    return (
        <>
            <h2 className={css.header}>What do you think of this product</h2>
            <h3>Like it or not let us know what you think</h3>

            <p>Overall rating (required)</p>
 <Rating
        name="simple-controlled"
        value={value}
        onChange={setStarValue}
            />
        </>
    )

}

StarRatings.propTypes = {
  value: PropTypes.number,
  setStarValue: PropTypes.func,
  
};

export default StarRatings;