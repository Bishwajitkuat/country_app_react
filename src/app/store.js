import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "../features/countries/countriesSlice";
import favoritesSlice from "../features/countries/favoritesSlice";
import userSlice from "../features/users/usersSlice";

export default configureStore({
  reducer: {
    countries: countriesSlice,
    favourites: favoritesSlice,
    users: userSlice,
  },
});
