import { useLocation } from "react-router-dom";
import moment from "moment";
import ReceiptDetails from "../components/ReceiptDetails/ReceiptDetails";

const Receipt = () => {
  const location = useLocation();
  const cart = location.state.cart;
  const shipping = location.state.ship;
  const stripeID = location.state.stripeID;
  console.log(cart);
  console.log(shipping);
  console.log(stripeID);

  return (
    <>
      {cart && (
        <div>
          <h1>Receipt</h1>
          <h2>{moment().format("MM/DD/YYYY")}</h2>
          <h2>Order #: {cart[0][0].cartNun}</h2>
          <ReceiptDetails cart={cart} />
        </div>
      )}
    </>
  );
};

export default Receipt;
