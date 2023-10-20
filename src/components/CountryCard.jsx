import { Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  addFavourite,
  removeFavourite,
} from "../features/countries/favoritesSlice";
import { Link } from "react-router-dom";

function CountryCard({ country }) {
  const dispatch = useDispatch();
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

  const handleFavourite = (e, countryName) => {
    e.preventDefault();
    // if favourite property does not exist, early return
    if (country.favourite === undefined) return;
    if (country.favourite) {
      dispatch(removeFavourite(countryName));
    } else dispatch(addFavourite(countryName));
  };

  return (
    <Col className="mt-5">
      <Link
        className="text-decoration-none"
        to={`/countries/${country.name.common}`}
        state={{ country: country }}
      >
        <Card className="h-100">
          <Card.Body className="d-flex flex-column">
            <img
              className="mb-4 img-fluid"
              src={country.flags.png}
              alt={`flage of ${country.name.common}`}
            />
            <Card.Title>{country.name.common}</Card.Title>
            <Card.Subtitle className="mb-1 text-muted">
              {country.name.official}
            </Card.Subtitle>
            <ListGroup
              variant="flush"
              className="flex-grow-1 justify-content-end"
            >
              {/* <ListGroupItem>
                <img
                  style={{ width: "5rem" }}
                  src={country.flags.png}
                  alt={`flage of ${country.name.common}`}
                />
              </ListGroupItem> */}
              <ListGroup.Item>
                <button
                  onClick={(e) => handleFavourite(e, country.name.common)}
                  className="btn btn-outline-secondary"
                >
                  <i
                    className={
                      country.favourite
                        ? "bi bi-heart-fill text-danger h3"
                        : "bi bi-heart text-danger h3"
                    }
                  ></i>
                </button>
              </ListGroup.Item>
              <ListGroup.Item>
                <i
                  className="bi bi-translate me-2"
                  style={{ fontSize: "1.5rem", color: "cornflowerblue" }}
                ></i>
                <span>
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
      </Link>
    </Col>
  );
}

export default CountryCard;
