/* eslint-disable */
import React from 'react';
import MovieService from '../services/moviedb-service';
import FilmList from '../film-list';
import './app.css';
import { Spin } from 'antd';
import ErrorMessage from '../error-message';
import { debounce } from 'lodash';
import SearchBar from '../search-bar';
import PagePagination from '../pagination';
import SearchTab from '../search-tab';
import RatedTab from '../rated-tab';
import { MoviedbProvider } from '../moviedb-context';
import { Tabs } from 'antd';
import ErrorBoundry from '../error-boundry';

export default class App extends React.Component {
  moviedb = new MovieService();

  state = {
    totalPages: 1,
    films: [],
    ratedPages: 1,
    ratedFilms: [],
    search: 'welcome',
    noResults: false,
    loading: true,
    error: false,
    connection: true,
    currentTab: 'search',
  };

  async componentDidMount() {
    await this.moviedb.startNewSession();
    await this.requestFilms();
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

  requestRatedFilms = (page = 1) => {
    this.moviedb
      .getRatedFilms(page)
      .then((res) => {
        this.setState({ ratedPages: res.total_pages });
        return res.results;
      })
      .then(this.onLoadRatedFilms)
      .catch(() => this.stateError());
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.search === '') return;
    if (this.state.search !== prevState.search) this.requestFilms();
    if (this.state.currentTab === 'rated' && this.state.currentTab !== prevState.currentTab) this.requestRatedFilms();
    if (this.state.currentTab === 'search' && this.state.currentTab !== prevState.currentTab) this.requestFilms();
  }

  onLoadFilms = (allFilms) => {
    this.setState({ loading: true, noResults: false });
    if (allFilms.length === 0) {
      return this.setState({ noResults: true, loading: false });
    }
    let newData = [];
    allFilms.forEach((film) => {
      newData = [...newData, this.createFilmData(film)];
    });
    if (this.state.ratedFilms.length !== 0) {
      this.state.ratedFilms.forEach((ratedFilm) => {
        newData.forEach((film, i) => (ratedFilm.id === film.id ? (newData[i] = { ...ratedFilm }) : film));
      });
    }
    this.setState({ films: newData, loading: false });
  };

  onLoadRatedFilms = (ratedFilms) => {
    this.setState({ loading: true });
    // NO RATED FILMS???
    let newData = [];
    ratedFilms.forEach((film) => {
      newData = [...newData, this.createFilmData(film)];
      this.setState({ ratedFilms: newData });
    });
    this.setState({
      loading: false,
    });
  };

  onSearchChange = debounce((input) => {
    this.setState({ search: input });
  }, 500);

  onTabChange = (tab) => {
    this.setState({ currentTab: tab });
  };

  createFilmData(film) {
    return {
      title: film.title,
      date: film.release_date,
      poster: film.poster_path,
      overview: film.overview,
      id: film.id,
      rating: film.rating,
      avgRating: film.vote_average,
      filmGenres: film.genre_ids,
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
    const { films, loading, error, connection, totalPages, noResults, currentTab, ratedFilms, ratedPages } = this.state;
    const pageIsReady = !(loading || error || !connection);

    const search = pageIsReady ? <SearchBar onSearchChange={this.onSearchChange} results={noResults} /> : null;
    const loadingIndicator = loading ? <Spin /> : null;
    const errorMessage = error ? <ErrorMessage message={'Oooops...Something`s gone wrong :('} /> : null;
    const offline = !connection ? <ErrorMessage message={'Sorry! Lost internet connection :('} /> : null;
    const filmList = pageIsReady ? <FilmList filmsData={films} posterBase={this.moviedb._posterBase} /> : null;
    const ratedFilmsList = pageIsReady ? (
      <FilmList filmsData={ratedFilms} posterBase={this.moviedb._posterBase} loading={loading} />
    ) : null;
    const pagination = pageIsReady ? (
      <PagePagination totalFilms={totalPages * 20} onPageChange={this.requestFilms} />
    ) : null;
    const ratedPagination = pageIsReady ? (
      <PagePagination totalFilms={ratedPages * 20} onPageChange={this.requestRatedFilms} />
    ) : null;

    const items = [
      {
        key: 'search',
        label: 'Search',
        children: (
          <SearchTab
            search={search}
            loadingIndicator={loadingIndicator}
            errorMessage={errorMessage}
            offline={offline}
            filmList={filmList}
            pagination={pagination}
          />
        ),
      },
      {
        key: 'rated',
        label: 'Rated',
        children: (
          <RatedTab
            loadingIndicator={loadingIndicator}
            errorMessage={errorMessage}
            offline={offline}
            ratedFilmsList={ratedFilmsList}
            ratedPagination={ratedPagination}
          />
        ),
      },
    ];

    return (
      <ErrorBoundry>
        <MoviedbProvider value={this.moviedb}>
          <section className="movieApp">
            <Tabs
              defaultActiveKey="search"
              activeKey={currentTab}
              onChange={(tab) => this.onTabChange(tab)}
              items={items}
              centered={true}
            />
          </section>
        </MoviedbProvider>
      </ErrorBoundry>
    );
  }
}
