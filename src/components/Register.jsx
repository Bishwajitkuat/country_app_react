import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/users/usersSlice";

function Register() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const { user, isLoadingUser, errorUser } = useSelector(
    (state) => state.users
  );
  const navigate = useNavigate();

  const registerHandler = () => {
    if (!name) alert("Please enter name");
    else if (password === "") alert("Please enter password");
    else if (password !== confirmPassword)
      alert("Password did not match in confirm password");
    else dispatch(register(name, email, password));
  };
  useEffect(() => {
    if (errorUser) {
      alert(errorUser);
      return;
    }
    if (user) navigate("/countries");
  }, [user, errorUser]);

  if (isLoadingUser) return <Loader />;
  if (!user)
    return (
      <div className="row justify-content-center">
        <div className="col col-md-6">
          <div className="mt-3">
            <label className="form-label fw-bold text-white" htmlFor="name">
              Name
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person-fill text-primary"></i>
              </span>
              <input
                className="form-control"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="form-label  fw-bold text-white" htmlFor="email">
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope text-primary"></i>
              </span>
              <input
                className="form-control"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="password" className="form-label fw-bold text-white">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock-fill text-primary"></i>
              </span>
              <input
                className="form-control"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>
          <div className="mt-3">
            <label
              htmlFor="confirmPassword"
              className="form-label fw-bold text-white"
            >
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock-fill text-primary"></i>
              </span>
              <input
                className="form-control"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div className="text-center mt-5">
            <button
              className="btn btn-outline-primary"
              onClick={registerHandler}
            >
              Register
            </button>
          </div>
          <div className="text-center mt-3 text-white">
            <span>Already have a account! </span>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    );
}

export default Register;
