import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Countries from "./components/Countries";
import CountriesSingle from "./components/CountriesSingle";
import Home from "./components/Home";
import Layout from "./pages/Layout";

import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./auth/firebase";
import Favourites from "./components/Favourites";

const App = () => {
  const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/countries/:single" element={<CountriesSingle />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
