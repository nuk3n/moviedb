/* eslint-disable */
import React from 'react';
import MovieService from '../services/moviedb-service';
import FilmList from '../film-list';
import './app.css';
import LoadingIndicator from '../loading-indicator';
import ErrorMessage from '../error-message';

export default class App extends React.Component {
  moviedb = new MovieService();

  nextFilmID = 1;

  state = {
    films: [],
    loading: true,
    error: false,
  };

  constructor() {
    super();
    this.moviedb
      .getAllFilms('result')
      .then(this.onLoadFilms)
      .catch(() => {
        this.setState({
          error: true,
        });
      });
  }

  onLoadFilms = (allFilms) => {
    const filmsPage = allFilms.slice(0, 6);
    filmsPage.forEach((film) => {
      this.setState(({ films }) => {
        let newData = [...films, this.createFilmData(film)];
        return {
          films: newData,
          loading: false,
        };
      });
    });
  };

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
    const loading = this.state.loading ? <LoadingIndicator /> : null;
    const filmList = !this.state.loading ? (
      <FilmList filmsData={this.state.films} posterBase={this.moviedb._posterBase} />
    ) : null;
    const error = this.state.error ? <ErrorMessage message={'Oooops...Something`s gone wrong :('} /> : null;
    const offline = !window.navigator.onLine ? <ErrorMessage message={'Sorry! Lost internet connection :('} /> : null;

    return (
      <section className="movieApp">
        {loading}
        {error}
        {offline}
        {filmList}
      </section>
    );
  }
}
