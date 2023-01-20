export default class MovieService {
  apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=8bc8dfb3824f8f7b0c2387061f10c48f';

  apiKey = '8bc8dfb3824f8f7b0c2387061f10c48f';

  posterBase = 'https://image.tmdb.org/t/p/original';

  newSession = 'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=8bc8dfb3824f8f7b0c2387061f10c48f';

  newSessionId;

  genresList = [];

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return res.json();
  }

  async getAllFilms(search, page = 1) {
    return this.getResource(`&query=${search}&page=${page}`);
  }

  async startNewSession() {
    const res = await fetch(`${this.newSession}`);
    const session = await res.json();
    this.newSessionId = session.guest_session_id;
    const genresRes = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`);
    const genresObj = await genresRes.json();
    this.genresList = genresObj.genres;
  }

  async getRatedFilms(page) {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${this.newSessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc&page=${page}`
    );
    return res.json();
  }

  rateFilm = async (id, value) => {
    const rating = {
      value,
    };
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${this.newSessionId}`,
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
