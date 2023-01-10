/* eslint-disable */
export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=8bc8dfb3824f8f7b0c2387061f10c48f';
  _posterBase = 'https://image.tmdb.org/t/p/original';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getAllFilms(search) {
    const res = await this.getResource(`&query=${search}`);
    return res.results;
  }

  async getFilmBySearch(search, idx) {
    const films = await this.getAllFilms(search);
    return films[idx];
  }
}
