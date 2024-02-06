import React from "react";
import { useState, useEffect } from "react";

import "./albums.css";

function Albums() {
  const [lettersArray, setLettersArray] = useState(["A", "B", "C", "D", "E"]);
  const [albumsArray, setAlbumsArray] = useState([]);
  const [searchBand, setSearchBand] = useState();

  function rotateArray(letters, albums) {
    if (albums.length) {
      letters.shift();
      letters.push(albums.shift());
      setLettersArray([...letters]);
      setAlbumsArray([...albums]);
    } else {
      letters.push(letters.shift());
      setLettersArray([...letters]);
    }
  }

  function changeSearchBand(value) {
    setSearchBand(value);
  }

  const searchBandByName = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `https://itunes.apple.com/search?term=` + searchBand + `&entity=song`
    );
    const newData = await response.json();
    if (newData.resultCount) {
      var songs = newData.results;
      songs.sort(function (a, b) {
        return a.collectionName.localeCompare(b.collectionName);
      });

      var albums = songs.map((song) => song.collectionName);
      albums = albums.filter((album, index) => albums.indexOf(album) === index);
      albums = albums.slice(0, 5);

      setAlbumsArray([...albums]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      rotateArray(lettersArray, albumsArray);
    }, 1000);

    return () => clearInterval(interval);
  }, [albumsArray]);

  return (
    <div className="albums">
      <div className="albums-container">
        <h1>Some random albums:</h1>
        <form onSubmit={searchBandByName}>
          <label htmlFor="band" className="inputFieldLabel">
            Select band:
          </label>
          <input
            name="band"
            onChange={(e) => changeSearchBand(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className="albums-list">
          {lettersArray.map((letter, index) => (
            <div className="album-item" key={index}>
              {letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Albums.propTypes = {};

Albums.defaultProps = {};

export default Albums;
