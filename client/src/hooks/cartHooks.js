import { useSelector } from "react-redux";
import { selectCartID,   } from '../redux/cart/cartSelectors'

export const useCart = () => {
  const getCartID = useSelector(selectCartID);


  return {
    getCartID,
  };
};