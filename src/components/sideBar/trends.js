import React from "react";
import axios from "axios";
import APIKit from "../../spotify";
import { useState, useEffect, Fragment } from "react";
import styles from "./trends.module.css";
import Search from "./search";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";

const Trends = () => {
  const [releases, setRelease] = useState(null);

  useEffect(() => {
    APIKit.get("browse/new-releases?&limit=10&offset=0").then((response) => {
      setRelease(response.data.albums.items);
      console.log(response.data);
    });
  }, []);
  return (
    <div>
      <Search />
      <h2 className={styles.title}>Latest Top 10 Release</h2>
      <section>
        {releases?.map((release) => (
          <div className={styles.artistss} key={release.id}>
            <img className={styles.artist_img} src={release.images[0].url} />

            <h2>🎼 {release.name}</h2>
            <h2>🎤 {release.artists[0].name}</h2>
            <IconContext.Provider value={{ size: "50px", color: "#c92f2f" }}>
              <AiFillPlayCircle className={styles.play_playlist} />
            </IconContext.Provider>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Trends;
