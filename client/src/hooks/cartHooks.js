import { useSelector } from "react-redux";
import { selectCartID, selectCurrentCart  } from '../redux/cart/cartSelectors'

export const useCart = () => {
  const getCartID = useSelector(selectCartID);
  const getCurrentCart = useSelector(selectCurrentCart);


  return {
    getCartID,
    getCurrentCart
  };
};