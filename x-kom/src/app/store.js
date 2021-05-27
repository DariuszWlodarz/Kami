import { configureStore } from '@reduxjs/toolkit';
import reservationReducer from './slice'


export const store = configureStore({
  reducer: {
    reservation: reservationReducer
  }
})
