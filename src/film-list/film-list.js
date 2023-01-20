/* eslint-disable */
import Film from '../film';
import React from 'react';
import './film-list.css';

function FilmList({ filmsData, posterBase }) {
  const formatedFilmsList = filmsData.map((film) => {
    return <Film key={film.id} filmData={film} posterBase={posterBase} />;
  });

  return <div className="filmsList">{formatedFilmsList}</div>;
}

export default FilmList;
