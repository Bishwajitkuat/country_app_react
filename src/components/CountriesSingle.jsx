import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import axios from "axios";

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [weather, setWather] = useState("");
  const country = location.state.country;
  const [errors, setError] = useState(false);
  const [loading, setLoading] = useState(true);

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
        console.log(err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    featchData();
  }, [country.capital]);

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
          <Image
            thumbnail
            src={`https://source.unsplash.com/1600x900/?${country.capital}`}
          />

          <h2 className="display-4">{country.name.common}</h2>
          <h3>{country.capital}</h3>
          {errors && (
            <p>Sorry, we don't have weather information for this country</p>
          )}
          {!errors && weather && (
            <div>
              <p>
                Right now it is <strong>{parseInt(weather.main.temp)}</strong>{" "}
                degrees in {country.capital} and{" "}
                {weather.weather[0].description}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={`${weather.weather[0].description}`}
              />
            </div>
          )}
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
