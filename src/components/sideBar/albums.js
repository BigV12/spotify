import React from "react";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import APIKit from "../../spotify";
import styles from "./artist.module.css";

// COMPONENTT
const Albums = () => {
  const [albums, setAlbum] = useState(null);
  useEffect(() => {
    APIKit.get(
      "artists/24o0iQQPaGlTFyzUICrXoh/albums?/tracks/limit=10&offset=0"
    ).then((response) => {
      setAlbum(response.data.items);
      console.log(response.data.items);
    });
  }, []);

  // RETURN HTML
  return (
    <div>
      {albums?.map((album) => (
        <div className={styles.albumm} key={album.id}>
          <h2> {album.total_tracks}</h2>
          <h2> {album.name}</h2>
          <img className={styles.artist_img} src={album.images[0].url} />
        </div>
      ))}
    </div>
  );
};

export default Albums;
