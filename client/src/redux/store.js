import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './users/usersSlice.js'
import { addressReducer } from './addresses/addressSlice.js'


export const store = configureStore({
    reducer: { 
        user: usersReducer,
        address: addressReducer
    },
 middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      
      serializableCheck: false,
    }),  
});