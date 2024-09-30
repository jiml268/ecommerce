import { useSelector } from "react-redux";
import { selectCurrentColor, selectCurrentSize,  } from '../redux/products/productsSelectors'

export const useProduct = () => {
  const getCurrentColor = useSelector(selectCurrentColor);
  const getCurrentSize = useSelector(selectCurrentSize);


  return {
    getCurrentColor,getCurrentSize,
  };
};