import { createSlice } from "@reduxjs/toolkit";

const HotelSlice = createSlice({
  name: "hotels",
  initialState: {
    isSticky: false,
    // searchQuerys: {
    //   city: "",
    //   country: "",
    //   checkinDate: "",
    //   checkoutDate: "",
    //   numGuests: 1,
    // },
    // filterQuerys: {
    //   priceRange: [0, 1000],
    //   ratingAverage: null,
    //   starRating: null,
    //   popularfacilities: [],
    //   maxBookingLength: 0,
    //   cabinTypes: [],
    // },
  },
  reducers: {
    setSticky: (state, action) => {
      state.isSticky = action.payload;
    },
    // searchQuerys
  },
});

export const { setSticky } = HotelSlice.actions;
export default HotelSlice.reducer;
