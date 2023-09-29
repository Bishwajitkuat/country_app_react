import { Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CountryCard({ country }) {
  const currency_name = country?.currencies
    ? Object.values(country.currencies)[0].name
    : "not available";

  const currency_symbol = country?.currencies
    ? Object.values(country.currencies)[0].symbol
    : "not available";
  const language_name = country?.languages
    ? Object.values(country.languages)[0]
    : "not available";
  const language_symbol = country?.languages
    ? Object.keys(country.languages)[0].toUpperCase()
    : "not available";

  return (
    <Col className="mt-5">
      <LinkContainer
        to={`/countries/${country.name.common}`}
        state={{ country: country }}
      >
        <Card className="h-100">
          <Card.Body className="d-flex flex-column">
            <Card.Title>{country.name.common}</Card.Title>
            <Card.Subtitle className="mb-5 text-muted">
              {country.name.official}
            </Card.Subtitle>
            <ListGroup
              variant="flush"
              className="flex-grow-1 justify-content-end"
            >
              <ListGroupItem>
                <img
                  style={{ width: "5rem" }}
                  src={country.flags.png}
                  alt={`flage of ${country.name.common}`}
                />
              </ListGroupItem>
              <ListGroup.Item>
                <i
                  className="bi bi-translate me-2"
                  style={{ fontSize: "1.5rem", color: "cornflowerblue" }}
                ></i>
                <span>
                  {" "}
                  {language_name} ({language_symbol})
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                <i
                  className="bi bi-cash-coin me-2"
                  style={{ fontSize: "1.5rem", color: "cornflowerblue" }}
                ></i>{" "}
                <span>
                  {" "}
                  {currency_name} ({currency_symbol})
                </span>
              </ListGroup.Item>

              <ListGroup.Item>
                <i
                  className="bi bi-people me-2"
                  style={{ fontSize: "1.5rem", color: "cornflowerblue" }}
                ></i>
                <span> {country.population.toLocaleString()} M</span>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </LinkContainer>
    </Col>
  );
}

export default CountryCard;
