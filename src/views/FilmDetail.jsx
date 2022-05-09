import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function FilmDetail() {
  const [film, setFilm] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchEachFilm = async () => {
      const res = await fetch(`https://ghibliapi.herokuapp.com/films/${id}`);
      const filmData = await res.json();
      console.log('FILM DATA', filmData);
      setFilm(filmData);
      setLoading(false);
    };
    fetchEachFilm();
  }, []);

  return (
    <>
      <Link to="/">
        <button>Back to Film List</button>
      </Link>
      <hr />
      {loading ? (
        <p>Loading film...</p>
      ) : (
        <>
          <section>
            <h2>
              {film.title} <br />
              {film.original_title}
            </h2>
            <p>Director: {film.director}</p>
            <p>Producer: {film.producer}</p>
            <p>Story Summary: {film.description}</p>
            <img src={film.image} alt="film-image" />
          </section>
        </>
      )}
    </>
  );
}
