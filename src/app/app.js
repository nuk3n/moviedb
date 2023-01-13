/* eslint-disable */
import React from 'react';
import MovieService from '../services/moviedb-service';
import FilmList from '../film-list';
import './app.css';
import LoadingIndicator from '../loading-indicator';
import ErrorMessage from '../error-message';
import SearchBar from '../search-bar';
import { Pagination } from 'antd';
import { debounce } from 'lodash';

export default class App extends React.Component {
  moviedb = new MovieService();

  nextFilmID = 1;

  state = {
    totalPages: 1,
    currentPage: 1,
    films: [],
    search: 'return',
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.requestFilms();
  }

  requestFilms = (page) => {
    this.moviedb
      .getAllFilms(this.state.search, page)
      .then((res) => {
        this.setState({ totalPages: res.total_pages });
        return res.results;
      })
      .then(this.onLoadFilms)
      .catch(() => {
        this.setState({
          error: true,
          loading: false,
        });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.search === '') return;
    if (this.state.search !== prevState.search) {
      this.moviedb
        .getAllFilms(this.state.search)
        .then(this.onLoadFilms)
        .catch(() => {
          this.setState({
            error: true,
            loading: false,
          });
        });
    }
  }

  onLoadFilms = (allFilms) => {
    this.setState({ loading: true });
    let newData = [];
    allFilms.forEach((film) => {
      this.setState(({ films }) => {
        newData = [...newData, this.createFilmData(film)];
        return {
          films: newData,
          loading: false,
        };
      });
    });
  };

  onSearchChange = debounce((input) => {
    this.setState({ search: input });
  }, 500);

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
        <SearchBar onSearchChange={this.onSearchChange} />
        {loading}
        {error}
        {offline}
        {filmList}
        <Pagination
          total={this.state.totalPages}
          onChange={(value) =>
            // this.setState({ currentPage: value })
            this.requestFilms(value)
          }
        />
      </section>
    );
  }
}
