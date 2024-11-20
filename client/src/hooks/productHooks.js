import { useSelector } from "react-redux";
import { selectCurrentColor, selectCurrentSize, selectSearchResults } from '../redux/products/productsSelectors'

export const useProduct = () => {
  const getCurrentColor = useSelector(selectCurrentColor);
  const getCurrentSize = useSelector(selectCurrentSize);
  const getSearchResults = useSelector(selectSearchResults);


  return {
    getCurrentColor,getCurrentSize,getSearchResults
  };
};