/* eslint-disable */
import Film from '../film';
import React from 'react';
import './film-list.css';
import EmptySearchWarning from '../empty-search-warning';

function FilmList({ filmsData, posterBase }) {
  const formatedFilmsList = filmsData.map((film) => {
    return <Film key={film.id} filmData={film} posterBase={posterBase} />;
  });
  const emptyWarning = filmsData.length === 0 ? <EmptySearchWarning /> : null;

  return (
    <div className="filmsList">
      {emptyWarning}
      {formatedFilmsList}
    </div>
  );
}

export default FilmList;
