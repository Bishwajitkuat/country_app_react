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
        <div className="py-3 text-center">
          <LinkContainer to="/countries">
            <button className="btn btn-outline-primary px-5 py-3 fw-bold">
              Countries
            </button>
          </LinkContainer>
        </div>
        <div className="py-5 text-center">
          <LinkContainer to="/login">
            <button className="btn btn-outline-primary me-5">Login</button>
          </LinkContainer>
          <LinkContainer to="/register">
            <button className="btn btn-outline-primary">Register</button>
          </LinkContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
