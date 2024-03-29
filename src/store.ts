// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import hotels from "./features/hotels/hotelSlice";

const store = configureStore({
  reducer: {
    hotels,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
