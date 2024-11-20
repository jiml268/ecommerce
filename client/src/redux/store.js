import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user/userSlice';
import { procuctReducer } from './products/productsSlice';
import { cartReducer } from './cart/cartSlice';
import { paymentReducer } from './payments/paymentsSlice';

export const store = configureStore({
    reducer: { 
      user: userReducer, 
    product: procuctReducer,
    cart: cartReducer,
    payment: paymentReducer,
    },
 middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      
      serializableCheck: false,
    }),  
});