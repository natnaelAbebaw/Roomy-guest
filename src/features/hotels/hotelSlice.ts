import { createSlice } from "@reduxjs/toolkit";

const HotelSlice = createSlice({
  name: "hotels",
  initialState: {
    isSticky: false,
  },
  reducers: {
    setSticky: (state, action) => {
      state.isSticky = action.payload;
    },
  },
});

export const { setSticky } = HotelSlice.actions;
export default HotelSlice.reducer;
