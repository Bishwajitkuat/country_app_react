import { useEffect, useState } from "react";
import {
  auth,
  loginWithEmailAndPassword,
  registerWithAndPassword,
} from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { addDoc } from "firebase/firestore";
import Register from "./Register";

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
      <div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <Button onClick={() => loginWithEmailAndPassword(email, password)}>
          Login
        </Button>
        <div>
          <span>Don't have an account?</span>
          <Link to="/register">Register</Link>
        </div>
      </div>
    );
}

export default Login;
