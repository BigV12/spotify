import React, { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight, BsSearch } from "react-icons/bs";
import axios from "axios";
import APIKit from "../../spotify";
import { Link } from "react-router-dom";
import styles from "./search.module.css";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./player";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
function Search() {
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [image, setImage] = useState();
  const token = window.localStorage.getItem("token");
  const [playingTrack, setPlayingTrack] = useState();
  console.log(token);

  function chooseTrack(track) {
    setPlayingTrack(track);
    // setSearch("");
  }

  const searchArtists = async (e) => {
    let cancle = false;
    e.preventDefault();
    if (cancle) return;
    var { data } = await APIKit.get("https://api.spotify.com/v1/search", {
      params: {
        q: searchKey,
        type: "track",
      },
    });

    setArtists(
      data.tracks.items.map((track) => {
        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: track.album.images[0].url,
        };
      })
    );
    console.log(data);
    console.log();

    return () => (cancle = true);
  };

  const galbum = () => {
    APIKit.get(tracks).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <div className={styles.search}>
        <Link className={styles.arrow_btn}>
          <BsArrowLeft className={styles.left_btn} />
        </Link>

        <Link className={styles.arrow_btn}>
          <BsArrowRight className={styles.right_btn} />
        </Link>

        <form onSubmit={searchArtists}>
          <input
            placeholder="search for artist, song and ..."
            size="50"
            type="text"
            onChange={(e) => setSearchKey(e.target.value)}
            className={styles.searchBox}
          />
          <button type={"submit"} className={styles.search_btn}>
            <BsSearch className={styles.search_btn} />
          </button>
        </form>
        {/* search component */}
      </div>

      {/* FORM RESPONSE */}
      <section>
        {artists.map((track) => (
          <div className={styles.result_container}>
            <img src={track.albumUrl} className={styles.artist_image} />

            <h2>♫ {track.title}</h2>
            <h2>🎤 {track.artist}</h2>
            <IconContext.Provider value={{ size: "50px", color: "#c92f2f" }}>
              <AiFillPlayCircle className={styles.play_playlist} />
            </IconContext.Provider>
          </div>
        ))}
      </section>

      <div>
        {/* <Player accessToken={token} trackUri={playingTrack?.uri} /> */}
      </div>
    </div>
  );
}

export default Search;
