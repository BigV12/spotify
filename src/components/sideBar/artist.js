import React from "react";
import axios from "axios";
import APIKit from "../../spotify";
import { useState, useEffect, Fragment } from "react";
import styles from "./artist.module.css";
import Search from "./search";

const Artist = () => {
  const [artists, setArtist] = useState(null);

  useEffect(() => {
    APIKit.get("me/following?limit=50&type=artist").then((response) => {
      setArtist(response.data.artists.items);
      // console.log(response.data.artists.items);
    });
  }, []);

  // MAIN WORK

  return (
    <Fragment>
      <Search />
      <h2 className={styles.title}> Artists You Follow</h2>
      <section>
        {artists?.map((artist) => (
          <div className={styles.artistss} key={artist.id}>
            <h2>👤 {artist.name}</h2>
            <h2>👥 {artist.followers.total} Followers</h2>
            <img className={styles.artist_img} src={artist.images[0].url} />
          </div>
        ))}
      </section>

      {/* ALBUM LIST */}
    </Fragment>
  );
};

export default Artist;
