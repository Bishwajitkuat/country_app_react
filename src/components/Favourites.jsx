import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializedCountries } from "../features/countries/countriesSlice";
import CountryCard from "./CountryCard";
import {
  getFavouritesFromSource,
  clearFavourites,
} from "../features/countries/favoritesSlice";
import Loader from "./Loader";

const Favourites = () => {
  const dispatch = useDispatch();

  let countriesList = useSelector((state) => state.countries.countries);
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const loadingCountry = useSelector((state) => state.countries.loading);
  const loadingFavourites = useSelector((state) => state.isLoading);
  const [search, setSearch] = useState("");

  if (favouritesList?.length > 0) {
    // filtering the favourites from countryList adding "favourite: true" property to each object
    countriesList = countriesList.reduce((acc, country) => {
      if (favouritesList.includes(country.name.common)) {
        return [...acc, { ...country, favourite: true }];
      }
      return acc;
    }, []);
  } else {
    countriesList = [];
  }

  useEffect(() => {
    dispatch(initializedCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  if (loadingCountry || loadingFavourites) {
    return <Loader />;
  }

  return (
    <Container fluid>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: "18rem" }}
              type="search"
              className="me-2 "
              placeholder="Search for countries"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className=" g-3">
        <Button
          onClick={() => {
            dispatch(clearFavourites());
          }}
        >
          Clear Favourites
        </Button>
      </Row>
      <Row xs={2} md={3} lg={4} className=" g-3">
        {countriesList
          .filter((c) => {
            return c.name.official.toLowerCase().includes(search.toLowerCase());
          })
          .map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
      </Row>
    </Container>
  );
};

export default Favourites;
