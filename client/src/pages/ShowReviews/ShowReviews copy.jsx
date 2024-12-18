import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {useLocation} from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(score, showRating, theme) {
  return {
    fontWeight: showRating.includes(score)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const stars = [5, 4, 3, 2, 1]
const sortOtions = [{ text: "Date newest to oldest", value: "datenew" },
  { text: "Date oldest to newest", value: "dateold" },
  { text: "Rating highest to lowest", value: "ratinghigh" },
  { text: "Rating lowest to highest", value: "ratinglow" }
]

const ShowReviews = () => {
  const location = useLocation();
  const { starNum, productReviews, productID } = location.state
  

    const [reviewToShow, setReviewToShow] = useState([])
    const [sortBy, setSortBy ] = useState("datenew")
     const theme = useTheme();
  const [showRating, setshowRating] = useState([]);


  useEffect(() => {
    if (starNum !== 0) {
          setReviewToShow(productReviews.filter((review) => review.rating === starNum*1 &&review.review !== null))
      setshowRating(prevArray => [...prevArray, starNum*1]);
      
        } else {
             setReviewToShow( productReviews.filter((num) => num.review !== null))
  
        }
        setSortBy('date')
    }, [productReviews, starNum])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setshowRating(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    if (event.target.value.length === 0) {
      setReviewToShow(productReviews.filter((num) => num.review !== null))
    } else {
      setReviewToShow([])
      event.target.value.map((star) => (
        setReviewToShow(prev =>  [...prev, ... productReviews.filter((num) => num.rating === star && num.review !== null)])
      ));

    }

  };
  
  const handleSort = (event) => {
    const {
      target: { value },
    } = event;
    

    if (value === 'datenew') {
      const sortedItems = [...reviewToShow].sort((a, b) => b.createDate - a.createDate);
      setReviewToShow(sortedItems);
      console.log(sortedItems)
    }
    if (value === 'dateold') {
 const sortedItems = [...reviewToShow].sort((a, b) => a.createDate - b.createDate);
      setReviewToShow(sortedItems);
      console.log(sortedItems)
    }
    
    if (value === 'ratinghigh') {
      const sortedItems = [...reviewToShow].sort((a, b) => b.rating - a.rating);
      setReviewToShow(sortedItems);
      console.log(sortedItems)
    }

    if (value === 'ratinglow') {
      const sortedItems = [...reviewToShow].sort((a, b) => a.rating - b.rating);
      setReviewToShow(sortedItems);
      console.log(sortedItems)

    }


  }
    return (
        <>
        <div>
          {console.log('reviewToShow', reviewToShow)}

          
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="star-label">Star Rating</InputLabel>
        <Select
          labelId="star-label"
          id="star-label"
          multiple
          value={showRating}
          onChange={handleChange}
          input={<OutlinedInput label="Star Ratings" />}
          MenuProps={MenuProps}
        >
          {stars.map((star) => (
            <MenuItem
              key={star}
              value={star}
              style={getStyles(star, showRating, theme)}
            >
              {star} {star !== 1?"stars":"star"}
            </MenuItem>
          ))}
            </Select>
           
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="sort-label">Sort by:</InputLabel>
        <Select
          labelId="sort-label"
          id="sort-label"
          value={sortBy}
          onChange={handleSort}
          input={<OutlinedInput label="Sort by" />}
          MenuProps={MenuProps}
        >
          {sortOtions.map((sort) => (
            <MenuItem
              key={sort.text}
              value={sort.value}
              style={getStyles(sort.value, sortBy, theme)}
            >
              {sort.text} 
            </MenuItem>
          ))}
            </Select>
           
          </FormControl> 
          
    </div>
        </>
    )
}
ShowReviews.propTypes = {
    starNum: PropTypes.number,
    productReviews: PropTypes.object,
};


export default ShowReviews;