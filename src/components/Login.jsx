import { useEffect, useState } from "react";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/countries");
  }, [user, loading]);
  if (!user)
    return (
      <div className="row justify-content-center  p-5">
        <div className="col col-md-6">
          <div>
            <label className="form-label fw-bold text-white" htmlFor="email">
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope text-primary"></i>
              </span>
              <input
                id="email"
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="form-label fw-bold text-white" htmlFor="password">
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
          <div className="text-center mt-4">
            <button
              className="btn btn-outline-primary"
              onClick={() => loginWithEmailAndPassword(email, password)}
            >
              Login
            </button>
          </div>
          <div className="text-center mt-3 text-white">
            <span>Don't have an account? </span>
            <Link to="/register">Register</Link>
          </div>
          <div className="mt-3 rounded border border-muted p-3 text-white">
            <p>You can loging with the following credentials to try it!</p>
            <p>Email: try@try.com</p>
            <p>Password: 123456</p>
          </div>
        </div>
      </div>
    );
}

export default Login;
