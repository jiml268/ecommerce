import './App.css'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar/NavBar';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader/Loader';
import PublicRoute from './components/PublicRoute/PublicRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
const Home = lazy(() => import('./pages/Home'));
const Registration = lazy(() => import('./pages/Registration'));
const VarifyUser = lazy(() => import('./pages/VarifyUser'));
const SignIn = lazy(() => import('./pages/SignIn'));
const ChangePassword = lazy(() => import('./pages/ChangePassword'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Page404 = lazy(() => import('./pages/ForgotPassword'));
const UserProfile = lazy(() => import('./pages/UserProfile'));


function App() {

   return (
    <div className="App">
       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
         < NavBar />
         <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
         <Route path="/registration" element={<PublicRoute><Registration /></PublicRoute>} />
         <Route path="/varifyUser" element={< PublicRoute ><VarifyUser /></PublicRoute>} />
         <Route path="/signIn" element={<PublicRoute><SignIn /></PublicRoute>} />
            <Route path="/changepassword" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
            <Route path="/forgotpassword" element={< PublicRoute ><ForgotPassword /></PublicRoute>} />
            <Route path="/changepassword" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
            <Route path="/userprofile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />

         <Route path="*" element={<PublicRoute><Page404 /></PublicRoute>} />
     
         </Routes>   
       </Suspense>  
    </div>
  );
}

export default App;