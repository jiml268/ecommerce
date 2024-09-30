import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user/userSlice';
import { procuctReducer } from './products/productsSlice';


export const store = configureStore({
    reducer: { 
      user: userReducer, 
       product: procuctReducer
    },
 middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      
      serializableCheck: false,
    }),  
});