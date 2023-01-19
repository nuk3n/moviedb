/* eslint-disable */
export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=8bc8dfb3824f8f7b0c2387061f10c48f';
  _apiKey = '8bc8dfb3824f8f7b0c2387061f10c48f';
  _posterBase = 'https://image.tmdb.org/t/p/original';
  _newSession =
    'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=8bc8dfb3824f8f7b0c2387061f10c48f';
  _newSessionId;
  genresList = [];

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getAllFilms(search, page = 1) {
    return await this.getResource(`&query=${search}&page=${page}`);
  }

  async startNewSession() {
    const res = await fetch(`${this._newSession}`);
    const session = await res.json();
    this._newSessionId = session.guest_session_id;
    const genresRes = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._apiKey}`);
    const genresObj = await genresRes.json();
    this.genresList = genresObj.genres;
  }

  async getRatedFilms(page) {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${this._newSessionId}/rated/movies?api_key=${this._apiKey}&language=en-US&sort_by=created_at.asc&page=${page}`
    );
    return await res.json();
  }

  rateFilm = async (id, value) => {
    const rating = {
      value: value,
    };
    const rate = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${this._apiKey}&guest_session_id=${this._newSessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(rating),
      }
    );
  };
}
