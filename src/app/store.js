import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "../features/countries/countriesSlice";
// import favoritesSlice from "../features/countries/favoritesSlice";

export default configureStore({
  reducer: {
    countries: countriesSlice,
    // favourites: favoritesSlice,
  },
});
