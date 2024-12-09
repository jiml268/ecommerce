import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user/userSlice';
import { procuctReducer } from './products/productsSlice';
import { cartReducer } from './cart/cartSlice';
import { paymentReducer } from './payments/paymentsSlice';
import { orderReducer } from './orders/ordersSlice';
import { reviewReducer } from './review/reviewSlice';

export const store = configureStore({
    reducer: { 
      user: userReducer, 
    product: procuctReducer,
    cart: cartReducer,
    payment: paymentReducer,
    order: orderReducer,
     review: reviewReducer
    },
 middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      
      serializableCheck: false,
    }),  
});