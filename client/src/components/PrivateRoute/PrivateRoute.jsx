//external
import { Navigate } from 'react-router-dom';

//internal
import { useAuth } from '../../hooks/userHooks';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const {loggedIn} = useAuth();
    return (
        <>
            {loggedIn ? children : <Navigate to="/signIn" />}
        </>)
};

export default PrivateRoute;