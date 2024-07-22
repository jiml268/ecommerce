import { useSelector } from "react-redux";
import { selectIsLoggedIn } from '../redux/user/userSelectors'

export const useAuth = () => {
  const loggedIn = useSelector(selectIsLoggedIn);
  

  return {
    loggedIn,
  };
};