import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import styles from "./home.module.css";
import { BsArrowLeft, BsArrowRight, BsSearch } from "react-icons/bs";
import {
  BrowserRouter,
  Router,
  Routes,
  Route,
  NavLink,
  Link,
  useNavigate,
} from "react-router-dom";
import hero from "../assets/hero-img.webp";
import apiClient from "../../spotify";
import axios from "axios";
import APIKit from "../../spotify";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import Search from "./search";
import Player from "./player";

const Home = () => {
  const [playLists, setPlayList] = useState(null);

  useEffect(() => {
    APIKit.get("me/playlists").then((response) => {
      setPlayList(response.data.items);
      console.log(response.data.items[0].uri);
    });
  }, []);

  const navigate = useNavigate();
  const playPlayList = (id) => {
    navigate("/player", { state: { id: id } });
  };

  return (
    <Fragment>
      <Search />
      {/* main container that houses everything in the home page */}
      <div className={styles.container}>
        {/*   music conatainer, flex item 1 */}
        <div className={styles.main}>
          {/* search bar div */}

          {/* TRENDING image section */}
          <div className={styles.trending}>
            <h4> What's hot</h4>
            <div className={styles.find_trend}>
              <h1>Trending</h1>
              <Link className={styles.more_btn}>
                More <BsArrowRight className={styles.more_arrow} />
              </Link>
            </div>

            {/*HERO IMAGE SECTION*/}

            <div className={styles.hero_section}>
              <div className={styles.heroimg_text}>
                <h1>On Top of The World </h1>
                <button className={styles.play}>PLAY</button>
                <button className={styles.follow}>FOLLOW</button>
              </div>
            </div>
          </div>
          {/* playlist */}
          <h2 className={styles.playlist_title}>My Playlists</h2>
          <section className={styles.playlist_body}>
            {playLists?.map((playList) => (
              <div
                className={styles.playlist_con}
                key={playList.id}
                onClick={() => {
                  playPlayList(playList.id);
                }}
              >
                <p>{playList.name}</p>
                <img
                  src={playList.images[0].url}
                  className={styles.playlist_images}
                />

                <p>{playList.tracks.total} Tracks</p>

                <IconContext.Provider
                  value={{ size: "50px", color: "#c92f2f" }}
                >
                  <AiFillPlayCircle className={styles.play_playlist} />
                </IconContext.Provider>
              </div>
            ))}
          </section>
        </div>

        {/* other accessories like song et aall */}
        <div className={styles.accessories}></div>
      </div>
    </Fragment>
  );
};

export default Home;
