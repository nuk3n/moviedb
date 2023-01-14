/* eslint-disable */
import React from 'react';
import MovieService from '../services/moviedb-service';
import FilmList from '../film-list';
import './app.css';
import LoadingIndicator from '../loading-indicator';
import ErrorMessage from '../error-message';
import { debounce } from 'lodash';
import SearchBar from '../search-bar';
import PagePagination from '../pagination';

export default class App extends React.Component {
  moviedb = new MovieService();

  nextFilmID = 1;

  state = {
    totalPages: 1,
    films: [],
    search: 'return',
    loading: true,
    error: false,
    connection: true,
  };

  componentDidMount() {
    this.requestFilms();
  }

  requestFilms = (page = 1) => {
    this.moviedb
      .getAllFilms(this.state.search, page)
      .then((res) => {
        this.setState({ totalPages: res.total_pages });
        return res.results;
      })
      .then(this.onLoadFilms)
      .catch(() => this.stateError());
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.search === '') return;
    if (this.state.search !== prevState.search) this.requestFilms();
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

  stateError = () => {
    if (!window.navigator.onLine) {
      this.setState({
        connection: false,
        loading: false,
      });
    } else {
      this.setState({
        error: true,
        loading: false,
      });
    }
  };

  render() {
    const pageIsReady = !(this.state.loading || this.state.error || !this.state.connection);

    const loading = this.state.loading ? <LoadingIndicator /> : null;
    const filmList = pageIsReady ? (
      <FilmList filmsData={this.state.films} posterBase={this.moviedb._posterBase} />
    ) : null;
    const error = this.state.error ? <ErrorMessage message={'Oooops...Something`s gone wrong :('} /> : null;
    const offline = !this.state.connection ? <ErrorMessage message={'Sorry! Lost internet connection :('} /> : null;
    const search = pageIsReady ? <SearchBar onSearchChange={this.onSearchChange} /> : null;
    const pagination = pageIsReady ? (
      <PagePagination total={this.state.totalPages * 20} onPageChange={this.requestFilms} />
    ) : null;

    return (
      <section className="movieApp">
        {search}
        {loading}
        {error}
        {offline}
        {filmList}
        {pagination}
      </section>
    );
  }
}
