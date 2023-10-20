import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavourite,
  getFavouritesFromSource,
  removeFavourite,
} from "../features/countries/favoritesSlice";
import WeatherCard from "./WeatherCard";
import Map from "./Map";

import { initializedCountries } from "../features/countries/countriesSlice";
import Loader from "./Loader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";

const CountriesSingle = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const navigate = useNavigate();
  const countriesList = useSelector((state) => state.countries.countries);
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const [weather, setWather] = useState("");
  const countryFromLink = location.state.country;
  // after receiving the data from link, checking it againest favoritesList, if it exists in favouritesList adding favourites: true else flase
  const country = favouritesList.includes(countryFromLink.name.common)
    ? { ...countryFromLink, favourite: true }
    : { ...countryFromLink, favourite: false };
  const [errors, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    async function featchData() {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`
        );
        if (res.statusText !== "OK") throw new Error("no weather data found");
        setWather(res.data);
        setLoading(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    featchData();
    dispatch(initializedCountries());
    dispatch(getFavouritesFromSource());
  }, [country.capital, dispatch]);

  const handleFavourite = (name) => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (country.favourite) {
      dispatch(removeFavourite(name));
    } else {
      dispatch(addFavourite(name));
    }
  };

  const getNeighbourDetail = (c) => {
    return countriesList.filter((country) => country.cca3 === c)[0];
  };

  if (loading) return <Loader />;

  return (
    <div className="container container-xxl p-3 pt-0 text-white">
      <div className="row justify-content-center mt-5">
        <div className="col col-md-6 p-3">
          <div className="row">
            <div className="col-12 col-md-6">
              <img
                className="img img-fluid"
                src={country.flags.png}
                alt="country flag"
              />
            </div>
            <div className="col-12 col-md-6 row m-0">
              <button
                style={{
                  minHeight: "4rem",
                }}
                onClick={() => handleFavourite(country.name.common)}
                className="col-5 col-md-12 btn btn-outline-primary my-1 me-2"
              >
                <i
                  className={
                    country.favourite
                      ? "bi bi-heart-fill text-danger"
                      : "bi bi-heart text-danger"
                  }
                ></i>
                <span>
                  {country.favourite ? " Remove favourite" : " Add favourite"}
                </span>
              </button>
              <button
                style={{
                  minHeight: "4rem",
                }}
                className="col-5 col-md-12 btn btn-outline-primary my-1"
                onClick={() => navigate("/countries")}
              >
                Back to Countries
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 p-3">
          <WeatherCard
            weather={weather}
            loading={loading}
            errors={errors}
            capital={country.capital}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 p-3">
          <h2 className="display-4 fw-bold">{country.name.common}</h2>
          <div>
            <i className="bi bi-bank h4 text-primary me-3"></i>
            <span className="h4">{country.capital}</span>
          </div>
          <div className="py-3">
            <i className="bi bi-compass h4 text-primary me-3"></i>
            <span className="h4">{country.continents.join(", ")}</span>
          </div>
          <div className="row justify-content-start align-items-center">
            <h3 className="col-auto h4">Neibours: </h3>
            <div className="col-6 row">
              {country.borders.map((c) => {
                const NeighbourCountry = getNeighbourDetail(c);
                return (
                  <div className="col-3" key={c}>
                    <Link
                      className="text-decoration-none"
                      to={`/countries/${NeighbourCountry.name.common}`}
                      state={{ country: NeighbourCountry }}
                    >
                      <img
                        className="img m-1  img-fluid"
                        src={NeighbourCountry.flags.png}
                        alt="country flag"
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 p-3">
          <Image
            className="img img-fluid"
            thumbnail
            src={`https://source.unsplash.com/1600x900/?${country.capital}`}
          />
        </div>
      </div>
      <div style={{ minHeight: "350px" }} className="row p-3">
        <Map lati={country.latlng[0]} lngi={country.latlng[1]} />
      </div>
      <div className="row"></div>
    </div>
  );
};

export default CountriesSingle;
