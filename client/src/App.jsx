import './App.css'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar/NavBar';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader/Loader';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
const Home = lazy(() => import('./pages/Home'));
const Registration = lazy(() => import('./pages/Registration'));
const VarifyUser = lazy(() => import('./pages/VarifyUser'));
const SignIn = lazy(() => import('./pages/SignIn'));
const ChangePassword = lazy(() => import('./pages/ChangePassword'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Page404 = lazy(() => import('./pages/Page404/Page404'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const CategoryMenu = lazy(() => import('./components/CategoryMenu/CategoryMenu'));
const Product = lazy(() => import('./pages/Product/Product'))
const Cart = lazy(()=> import('./pages/GetCart/GetCart'))


function App() {

   return (
    <div className="App">
       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
         < NavBar />
         <CategoryMenu />
         <Suspense fallback={<Loader />}>
      <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/registration" element={<Registration />} />
                <Route path="/showProduct" element={<Product />} />

         <Route path="/varifyUser" element={<VarifyUser />} />
         <Route path="/signIn" element={<SignIn />} />
 <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/changepassword" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
            <Route path="/changepassword" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
            <Route path="/userprofile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
 <Route path="/cart" element={<Cart />} />
         <Route path="*" element={<Page404 />} />
     
         </Routes>   
       </Suspense>  
    </div>
  );
}

export default App;