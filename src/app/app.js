/* eslint-disable */
import React from 'react';
import MovieService from '../services/moviedb-service';
import FilmList from '../film-list';
import './app.css';

export default class App extends React.Component {
  moviedb = new MovieService();

  nextFilmID = 1;

  state = {
    films: [],
  };

  constructor() {
    super();
    this.moviedb.getAllFilms('result').then((allFilms) => {
      const filmsPage = allFilms.slice(0, 6);
      filmsPage.forEach((film) => {
        this.setState(({ films }) => {
          let newData = [...films, this.createFilmData(film)];
          return {
            films: newData,
          };
        });
      });
    });
  }

  createFilmData(film) {
    return {
      title: film.title,
      date: film.release_date,
      poster: film.poster_path,
      overview: film.overview,
      id: this.nextFilmID++,
    };
  }

  render() {
    return (
      <section className="movieApp">
        <FilmList filmsData={this.state.films} posterBase={this.moviedb._posterBase} />
      </section>
    );
  }
}
