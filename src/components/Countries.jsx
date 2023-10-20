import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import CountryCard from "./CountryCard";
import { initializedCountries } from "../features/countries/countriesSlice";
import { Spinner } from "react-bootstrap";
import { getFavouritesFromSource } from "../features/countries/favoritesSlice";

const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const loading = useSelector((state) => state.countries.isLoading);

  // adding favourite propety to each country object, value would be true if it exists in favouritesList
  const countriesWithFavourite = countriesList.map((country) => {
    if (favouritesList.some((item) => item === country.name.common)) {
      return { ...country, favourite: true };
    } else return { ...country, favourite: false };
  });
  const [search, setSearch] = useState("");
  // filter the country list based on search state change
  const filterCountryList = search
    ? countriesWithFavourite.filter((item) =>
        item.name.common.toLowerCase().includes(search.toLowerCase())
      )
    : countriesWithFavourite;
  useEffect(() => {
    dispatch(initializedCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

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
        {filterCountryList.map((item, index) => (
          <CountryCard key={item.id + item.name.common} country={item} />
        ))}
      </Row>
    </Container>
  );
};

export default Countries;
