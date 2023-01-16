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
    noResults: false,
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.search === '') return;
    if (this.state.search !== prevState.search) this.requestFilms();
  }

  onLoadFilms = (allFilms) => {
    this.setState({ loading: true, noResults: false });
    if (allFilms.length === 0) {
      this.setState({ noResults: true });
    }
    let newData = [];
    allFilms.forEach((film) => {
      newData = [...newData, this.createFilmData(film)];
      this.setState({ films: newData });
    });
    this.setState({
      loading: false,
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
    const { films, loading, error, connection, totalPages, noResults } = this.state;
    const pageIsReady = !(loading || error || !connection);

    const search = pageIsReady ? <SearchBar onSearchChange={this.onSearchChange} results={noResults} /> : null;
    const loadingIndicator = loading ? <LoadingIndicator /> : null;
    const errorMessage = error ? <ErrorMessage message={'Oooops...Something`s gone wrong :('} /> : null;
    const offline = !connection ? <ErrorMessage message={'Sorry! Lost internet connection :('} /> : null;
    const filmList = pageIsReady ? <FilmList filmsData={films} posterBase={this.moviedb._posterBase} /> : null;
    const pagination = pageIsReady ? (
      <PagePagination totalFilms={totalPages * 20} onPageChange={this.requestFilms} />
    ) : null;

    return (
      <section className="movieApp">
        {search}
        {loadingIndicator}
        {errorMessage}
        {offline}
        {filmList}
        {pagination}
      </section>
    );
  }
}
