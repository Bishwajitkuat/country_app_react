import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import CountryCard from "./CountryCard";
import { initializedCountries } from "../features/countries/countriesSlice";

const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(initializedCountries());
  }, [dispatch]);

  console.log("countriesList: ", countriesList);

  // We will be replacing this with data from our API.
  // const country = {
  //   name: {
  //     common: "Example Country",
  //   },
  // };

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
        {countriesList.map((item, index) => (
          <CountryCard key={item.id + item.name.common} country={item} />
        ))}
      </Row>
    </Container>
  );
};

export default Countries;
