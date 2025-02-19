import { useSelector } from "react-redux";
import {
  selectCartID,
  selectCurrentCart,
  selectAllCartItems,
  selectAllCartImages,
  selectSavedItems,
  selectSavedImages,
} from "../redux/cart/cartSelectors";

export const useCart = () => {
  const getCartID = useSelector(selectCartID);
  const getCurrentCart = useSelector(selectCurrentCart);
  const getAllCartItems = useSelector(selectAllCartItems);
  const getAllCartImages = useSelector(selectAllCartImages);
  const getSavedItems = useSelector(selectSavedItems);
  const getSavedImages = useSelector(selectSavedImages);

  return {
    getCartID,
    getCurrentCart,
    getAllCartItems,
    getAllCartImages,
    getSavedItems,
    getSavedImages,
  };
};
