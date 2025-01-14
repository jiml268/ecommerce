import './App.css'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar/NavBar';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader/Loader';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import SearchProducts from './components/SearchProducts/SearchProducts';
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
const EmptyCart = lazy(()=> import('./pages/EmptyCart/EmptyCart'))
const CkeckOut = lazy(()=> import('./pages/CkeckOut/CkeckOut'))
const Allorders = lazy(()=> import('./pages/AllOrders/AllOrders'))
const OrderDatails = lazy(()=> import('./pages/OrderDatails/OrderDatails'))
const AddReviews = lazy(()=> import('./pages/AddReviews/AddReviews'))
const ShowReviews = lazy(() => import('./pages/ShowReviews/ShowReviews'))
const CardList = lazy(() => import('./pages/CardList/CardList'))


import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {

  return (
      <Elements stripe={stripePromise}>
    <div className="App">
       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
        < NavBar />
        <div style={{display: 'flex', flexWrap: "wrap", justifyContent: "space-evenly", backgroundColor: "#1976d2"}}>
          <CategoryMenu />
          <SearchProducts />
          </div>
         <Suspense fallback={<Loader />}>
      <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/registration" element={<Registration />} />
            <Route path="/showProduct" element={<Product />} />
            <Route path="/CkeckOut" element={<CkeckOut />} />

         <Route path="/varifyUser" element={<VarifyUser />} />
         <Route path="/signIn" element={<SignIn />} />
 <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/changepassword" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
            <Route path="/changepassword" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
            <Route path="/userprofile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
           <Route path="/cart" element={<Cart />} />
            <Route path="/emptyCart" element={<EmptyCart />} />
            <Route path="/allorders" element={<Allorders />} />
            <Route path="/orderdetails" element={<OrderDatails />} />
            <Route path="/addReviews" element={<AddReviews />} />
            <Route path="/showReviews" element={<ShowReviews />} />
            <Route path="/cardList" element={<PrivateRoute><CardList /></PrivateRoute>} />
         <Route path="*" element={<Page404 />} />
     
         </Routes>   
       </Suspense>  
      </div>
      </Elements>
  );
}

export default App;