/* eslint-disable */
import Film from '../film';
import React from 'react';
import './film-list.css';
import PagePagination from '../pagination';
import SearchBar from '../search-bar';

function FilmList({ filmsData, posterBase, total, onPageChange, onSearchChange }) {
  return (
    <div className="filmsList">
      <SearchBar onSearchChange={onSearchChange} />
      {filmsData.map((film) => {
        return <Film key={film.id} filmData={film} posterBase={posterBase} />;
      })}
      <PagePagination total={total} onPageChange={onPageChange} />
    </div>
  );
}

export default FilmList;
