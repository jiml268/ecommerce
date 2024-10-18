import PropTypes from 'prop-types';

export default function CartInfo({ currentCart, cartImages }) {



    return (<>
        {console.log(currentCart)}
            {console.log(cartImages)}

    </>)
}



CartInfo.propTypes = {
  currentCart: PropTypes.array,
    cartImages: PropTypes.array,
};