import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import css from "./receiptDetails.module.css";

const ReceiptDetails = ({ cart }) => {
  const [showCart, setShowCart] = useState(null);

  useEffect(() => {
    setShowCart(cart);
  }, [cart]);

  return (
    <div className={css.itemsection}>
      {showCart && (
        <>
          {console.log("showCart", showCart[0])}
          {showCart[0].map((product) => (
            <div key={product.sku} className={css.item}>
              <div key={product.sku} className={css.itemDetails}>
                <p key={product.sku} className={css.parformat}>
                  {product.ProductName}
                </p>
                {product.colorName && (
                  <p className={css.parformat}> Color: {product.colorName}</p>
                )}
                {product.sizeName && (
                  <p className={css.parformat}> Size: {product.sizeName}</p>
                )}
                <p className={css.parformat}>Qty: {product.quantity} </p>
                <p className={css.parformat}>Price: ${product.price} each</p>
              </div>
              <div className={css.totalSection}>
                <p className={css.parformat}>${product.totalAmt} </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

ReceiptDetails.propTypes = {
  cart: PropTypes.array,
};

export default ReceiptDetails;
