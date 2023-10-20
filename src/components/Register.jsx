import { useEffect, useState } from "react";
import { auth, registerWithAndPassword } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Loader from "./Loader";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    else if (password === "") alert("Please enter password");
    else if (password !== confirmPassword)
      alert("Password did not match in confirm password");
    else registerWithAndPassword(name, email, password);
  };
  useEffect(() => {
    if (user) navigate("/countries");
  }, [user, loading]);

  if (loading) return <Loader />;
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
                <i class="bi bi-person-fill text-primary"></i>
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
                <i class="bi bi-envelope text-primary"></i>
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
                <i class="bi bi-lock-fill text-primary"></i>
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
                <i class="bi bi-lock-fill text-primary"></i>
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
            <button className="btn btn-outline-primary" onClick={register}>
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
