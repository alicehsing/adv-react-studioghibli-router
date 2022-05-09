import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { ghibliFilmsFetch } from '../services/ghibliApi-fetch';
import styles from '../App.css';

export default function FilmList() {
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState([]);

  // useEffect to fetch StudioGhibli API, create an object with the info I want to access to
  useEffect(() => {
    setLoading(true);
    const getFilmData = async () => {
      const ghibliFilmData = await ghibliFilmsFetch();
      console.log('ALL DATA', ghibliFilmData);
      setFilms(ghibliFilmData);
      setLoading(false);
    };
    getFilmData();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading Films...</p>
      ) : (
        <>
          <div className={styles.box}>
            <h1>Film List</h1>
            <div className={styles.list}>
              {films.map((film) => {
                return (
                  <section key={film.id} className={styles.film}>
                    <Link to={`/films/${film.id}`}>
                      <h3>{film.title}</h3>
                      <h3>{film.originalTitle}</h3>
                      <img src={film.image} alt="film-image" />
                    </Link>
                  </section>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
