import PropTypes from "prop-types"

export default function Payment({ buttonClick }) {


    return (
        <>
            <h1>Payment</h1>
            <button type="button" onClick={buttonClick} value="cart">Return to cart</button>
           
                <button type="button" value="bill" onClick={buttonClick}> Billing Address</button> 
                
                    <button type="button" value="ship" onClick={buttonClick}> Shipping Address</button>
                    <button type="button" value="submite payment"> Payment</button>
                
            
        </>
            
    )
}

Payment.propTypes = {
    buttonClick: PropTypes.func,

};