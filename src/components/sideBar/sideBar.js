import react, { useEffect } from "react";
import { useState } from "react";

import styles from "./side.Bar.module.css";
import {
  BrowserRouter,
  Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import Albums from "./albums";
import Artist from "./artist";
import Home from "./home";
import Trends from "./trends";

import {
  BsFillHouseDoorFill,
  BsFillCompassFill,
  BsReverseListColumnsReverse,
  BsPeopleFill,
  BsStar,
} from "react-icons/bs";
import Login from "../../auth/login";
import apiClient, { setClientToken } from "../../spotify";
import dp from "../assets/dp.jpg";

import Search from "./search";
import { render } from "@testing-library/react";

const SideBar = () => {
  let activeStyle = {
    textDecoration: "none",
    color: "white",
    backgroundColor: "black",
    width: "150px",
    height: "40px",
    padding: "10px",
    borderRadius: "7px",
  };

  let activeClassName = "underline";

  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  //calling apis
  const [image, setImage] = useState(dp);
  useEffect(() => {
    apiClient.get("me").then((response) => {
      setImage(response.data.images[0].url);
    });
  }, []);

  const showSideBar = () => {};

  return !token ? (
    <Login />
  ) : (
    <BrowserRouter>
      <div className={styles.flex_container}>
        <div className={styles.flex_items1}>
          <nav className={styles.container}>
            <ul className={styles.link_container}>
              <li>
                <img src={image} className={styles.dp} />
              </li>
              <li>
                <NavLink
                  to="/"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  <BsFillHouseDoorFill className={styles.home_logo} /> Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/trends"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  <BsReverseListColumnsReverse className={styles.home_logo} />{" "}
                  Latest
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/albums"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  <BsStar className={styles.home_logo} />
                  Albums
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/artist"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  <BsPeopleFill className={styles.home_logo} /> Artist
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.flex_items2}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/artist" element={<Artist />} />
          </Routes>
        </div>
      </div>

      {/* ROUTING STUFFS */}
    </BrowserRouter>
  );
};

export default SideBar;
