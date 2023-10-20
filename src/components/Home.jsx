import React from "react";
import { Container } from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";

const Home = () => {
  return (
    <div className="row justify-content-center align-items-center pt-5 m-0">
      <div className="col-12 col-md-6">
        <h1 className="display-1 fw-bold text-white">Welcome to Country App</h1>
        <p className="display-5 fst-italic text-primary">
          "Learn about different countires"
        </p>
        <p className="display-5 fst-italic text-primary">
          "Mark you favourite countries"
        </p>
      </div>
      <div className="col-12 col-md-6">
        <img
          className="img img-fluid rounded rounded-circle pb-5"
          src="./hero.jpg"
          alt=""
        />
        <div className="py-5 text-center">
          <LinkContainer to="/login">
            <button className="btn btn-outline-primary me-5">Login</button>
          </LinkContainer>
          <LinkContainer to="/register">
            <button className="btn btn-outline-primary">Register</button>
          </LinkContainer>
        </div>
      </div>

      {/* <div>
        <span>Countries app </span>is a simple React application made in
        Business College Helsinki lessons. App uses{" "}
        <a href="https://restcountries.com/">https://restcountries.com/ </a> and{" "}
        <a href="https://openweathermap.org/">https://openweathermap.org/</a>
      </div> */}
    </div>
  );
};

export default Home;
