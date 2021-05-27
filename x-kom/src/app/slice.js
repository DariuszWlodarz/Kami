import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  sitsToReserve: 0,
  shouldBeNextToEachOther: false,
  reservedSeats: []
}


const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setSitsToReserve(state, action) {
      state.sitsToReserve = action.payload
    },
    setBeNextToEachOther(state, action) {
      state.shouldBeNextToEachOther = action.payload
    },
    setReservedSeats(state, action) {
      state.reservedSeats = action.payload
    }

  }
})


export const {setSitsToReserve, setBeNextToEachOther, setReservedSeats } = reservationSlice.actions
export default reservationSlice.reducer
