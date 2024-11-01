import { useSelector } from "react-redux";
import { selectCartID, selectCurrentCart, selectAllCartItems, selectAllCartImages  } from '../redux/cart/cartSelectors'

export const useCart = () => {
  const getCartID = useSelector(selectCartID);
  const getCurrentCart = useSelector(selectCurrentCart);
  const getAllCartItems = useSelector(selectAllCartItems);
  const getAllCartImages = useSelector(selectAllCartImages);


  return {
    getCartID,
    getCurrentCart,
    getAllCartItems,
    getAllCartImages
  };
};