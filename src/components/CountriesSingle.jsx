import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [weather, setWather] = useState("");
  const country = location.state.country;
  const [errors, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`
      )
      .catch((err) => {
        setError(true);
      })
      .then((res) => {
        setWather(res.data);
        setLoading(false);
      });
  }, [country.capital]);
  console.log("weather :", weather);

  return (
    <Container>
      <div>Single Country will be here</div>
    </Container>
  );
};

export default CountriesSingle;
