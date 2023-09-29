// import { createSlice } from "@reduxjs/toolkit";

// const favourites =
//   localStorage.getItem("favourites") !== null
//     ? JSON.parse(localStorage.getItem("favourites"))
//     : [];

// export const favouritesSlice = createSlice({
//   name: "favourites",
//   initialState: {
//     favourites: favourites,
//   },
//   reducers: {
//     addFavourite: (state, action) => {
//       if (state.favourites.some((fav) => fav === action.palyload))
//         state.favourites = [...state.favourites];
//       state.favourites = [...state.favourites, action.palyload];
//       localStorage.setItem("favourites", JSON.stringify(state.favourites));
//     },
//   },
//   removeFavourite: (state, action) => {
//     const newArray = [...state.favourites];
//     newArray.splice(
//       newArray.findIndex((e) => e === action.palyload),
//       1
//     );
//     state.favourites = [...newArray];
//   },
//   clearFavourite: (state, action) => {
//     localStorage.removeItem("favourites");
//     state.favourites = [];
//   },
// });
// export const { addFavourite, removeFavourite, clearFavourite } =
//   favouritesSlice.action;
// export default favouritesSlice.reducers;
