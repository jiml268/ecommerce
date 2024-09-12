/* eslint-disable react/prop-types */
// external
import { Navigate } from 'react-router-dom';

//internal
import { useAuth } from '../../hooks/userHooks';

const PublicRoute = ({ children }) => {
    const { loggedIn } = useAuth();
   

    return (
        <>
            {!loggedIn ? children : <Navigate to="/diary" replace/>}
        </>)
};

export default PublicRoute;