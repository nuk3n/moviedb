/* eslint-disable */
import Film from '../film';
import React from 'react';
import './film-list.css';
import PagePagination from '../pagination';
import SearchBar from '../search-bar';

function FilmList({ filmsData, posterBase }) {
  return (
    <div className="filmsList">
      {filmsData.map((film) => {
        return <Film key={film.id} filmData={film} posterBase={posterBase} />;
      })}
    </div>
  );
}

export default FilmList;
