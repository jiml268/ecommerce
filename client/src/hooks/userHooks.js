import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserId, selectUserEmail } from '../redux/user/userSelectors'

export const useAuth = () => {
  const loggedIn = useSelector(selectIsLoggedIn);
  const getUserId = useSelector(selectUserId);
  const getUserEmail = useSelector(selectUserEmail);


  return {
    loggedIn,getUserId,getUserEmail
  };
};