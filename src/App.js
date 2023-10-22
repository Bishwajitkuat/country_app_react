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
import Favourites from "./components/Favourites";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.users.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loader" element={<Loader />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:single" element={<CountriesSingle />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/favourites" element={<Favourites />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
