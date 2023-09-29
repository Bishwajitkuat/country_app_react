// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getCountries } from "../features/countries/countriesSlice";

// function Favourites() {
//   const dispatch = useDispatch();

//   let countriesList = useSelector((state) => state.countries);
//   const loading = useSelector((state) => state.countries.loading);
//   const [search, setSearch] = useState("");
//   const favouritesList = useSelector((state) => state.favourites.favourites);

//   if (favouritesList !== null) {
//     countriesList = countriesList.filter((c) =>
//       favouritesList.includes(c.name.common)
//     );
//   } else {
//     countriesList = [];
//   }
//   useEffect(() => {
//     dispatch(getCountries);
//   }, [dispatch]);
//   return <div>Favourites here</div>;
// }

// export default Favourites;

function Favourites() {
  return <div>favourites will be here</div>;
}

export default Favourites;
