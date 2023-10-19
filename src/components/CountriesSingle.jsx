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
    <Container>
      <Row className="mt-5">
        <Col>
          <img style={{ width: "5rem" }} src={country.flags.png} />
          <h2 className="display-4">{country.name.common}</h2>
          <h3>{country.capital}</h3>
          <button
            onClick={() => handleFavourite(country.name.common)}
            className="btn btn-outline-secondary"
          >
            <i
              className={
                country.favourite
                  ? "bi bi-heart-fill text-danger"
                  : "bi bi-heart text-danger"
              }
            ></i>
            <span>
              {" "}
              {country.favourite ? "Remove from favourite" : "Add to favourite"}
            </span>
          </button>
        </Col>
        <Col>
          <WeatherCard
            weather={weather}
            loading={loading}
            errors={errors}
            capital={country.capital}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Image
            thumbnail
            src={`https://source.unsplash.com/1600x900/?${country.capital}`}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="light" onClick={() => navigate("/countries")}>
            Back to Countries
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;
