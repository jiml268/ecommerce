import PropTypes from "prop-types";
import css from "./receiptTotals.module.css";

const ReceiptTotals = ({ cart, shipping, stripeID }) => {
  console.log(cart[0]);
  console.log(shipping);
  console.log(stripeID);
  const sum = cart[0].reduce((accumulator, currentValue) => {
    const numberValue = Number(currentValue.totalAmt);
    return isNaN(numberValue) ? accumulator : accumulator + numberValue;
  }, 0);

  return (
    <div className={css.totalsection}>
      <div className={css.totalBox}>
        {shipping && (
          <div className={css.address}>
            <h3>Shipping Address</h3>
            <p>{shipping.name}</p>
            <p>{shipping.address.line1}</p>
            {shipping.address.line2 && <p>{shipping.address.line2}</p>}
            <p>
              {shipping.address.city} {shipping.address.state}{" "}
              {shipping.address.postal_code}
            </p>
          </div>
        )}

        {sum && (
          <div>
            <div className={css.totals}>
              <h3>Item Totals: </h3>
              <p className={css.textSpace}>${sum}</p>
            </div>
            <div className={css.totals}>
              <h3>Shipping: </h3>
              <p className={css.textSpace}>{sum >= 35 ? ` Free` : ` $6.99`}</p>
            </div>
            <div className={css.totals}>
              <h3>Total: </h3>
              <p className={css.textSpace}>
                {sum >= 35 ? ` $${sum}` : ` $${sum + 6.99}`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ReceiptTotals.propTypes = {
  cart: PropTypes.array,
  shipping: PropTypes.object,
  stripeID: PropTypes.string,
};

export default ReceiptTotals;
