
import { setIsLoggedIn, LoggedOut } from '../redux/user/userSlice'
import { useDispatch, } from "react-redux";
import { useAuth } from '../hooks/userHooks';


function Home() {
  const dispatch = useDispatch()
  const { loggedIn } = useAuth();
  
  const buttonClick = () => {
    loggedIn ?
      dispatch(LoggedOut(false)) :
      dispatch(setIsLoggedIn(true)) 

    
  }


  return (
    <>
      <h1>Home</h1>
      {loggedIn ?
        <button onClick={buttonClick}>Log Out</button> :
        <button onClick={buttonClick}>Log In</button>
      }
    </>
  )
}
export default Home