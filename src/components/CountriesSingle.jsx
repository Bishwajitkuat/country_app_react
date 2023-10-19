import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  addFavourite,
  getFavouritesFromSource,
  removeFavourite,
} from "../features/countries/favoritesSlice";
import WeatherCard from "./WeatherCard";

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [weather, setWather] = useState("");
  // this component does not get info from store, so I need to manage its localy for conditional css and function of add/remove button
  const [country, setCountry] = useState(location.state.country);
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
  }, [country.capital, dispatch]);

  const handleFavourite = (name) => {
    if (country.favourite) {
      //this update the favourite data in db, so other part will have access to updated data
      dispatch(removeFavourite(name));
      // as this component does not get data directly from store, local state manage necessary for  conditional add/remove handling
      setCountry({ ...country, favourite: false });
    } else {
      dispatch(addFavourite(name));
      setCountry({ ...country, favourite: true });
    }
  };

  if (loading) {
    return (
      <Container>
        <Spinner
          animation="border"
          role="status"
          className="center"
          varient="info"
        >
          <span className="visually-hidden">Loading......</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <div className="container container-xxl p-3 pt-0">
      <div className="row justify-content-center mt-5">
        <div className="col col-md-6 p-3">
          <div className="row">
            <div className="col-12 col-md-6">
              <img
                className="img m-1 img-fluid"
                src={country.flags.png}
                alt="country flag"
              />
            </div>
            <div className="col-12 col-md-6">
              <button
                style={{ maxWidth: "11rem", minHeight: "3rem" }}
                onClick={() => handleFavourite(country.name.common)}
                className="btn btn-outline-secondary m-1"
              >
                <i
                  className={
                    country.favourite
                      ? "bi bi-heart-fill text-danger"
                      : "bi bi-heart text-danger"
                  }
                ></i>
                <span>
                  {country.favourite
                    ? "Remove from favourite"
                    : "Add to favourite"}
                </span>
              </button>
              <button
                style={{ maxWidth: "11rem", minHeight: "3rem" }}
                className="btn btn-outline-primary m-1"
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
          <h2 className="display-4">{country.name.common}</h2>
          <h3>{country.capital}</h3>
        </div>
        <div className="col-12 col-md-6 p-3">
          <Image
            className="img img-fluid"
            thumbnail
            src={`https://source.unsplash.com/1600x900/?${country.capital}`}
          />
        </div>
      </div>
      <div className="row"></div>
      <div className="row">
        <Col></Col>
      </div>
    </div>
  );
};

export default CountriesSingle;
