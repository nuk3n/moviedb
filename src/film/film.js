/* eslint-disable */
import './film.css';
import { format } from 'date-fns';
import RateBar from '../rate-bar';
import FilmGenre from '../film-genre';

function Film(props) {
  const { filmData, posterBase } = props;
  const { title, date, poster, overview, id, rating, avgRating, filmGenres } = filmData;
  const formatedDate = date ? format(new Date(date), 'MMMM d, yyyy') : null;
  const colorBorder =
    avgRating < 3
      ? '#E90000'
      : avgRating < 5
      ? '#E97E00'
      : avgRating < 7
      ? '#E9D100'
      : avgRating >= 7
      ? '#66E900'
      : null;

  function cutOverview(text, maxLength) {
    if (text.length < maxLength) return text;
    let newText = text.slice(0, maxLength - 3);
    return newText.slice(0, newText.lastIndexOf(' ')) + ' ...';
  }

  const formatedFilmGenres = filmGenres.map((id) => {
    return <FilmGenre key={id} genreId={id} />;
  });

  return (
    <div className="filmCard">
      <img className="filmCard__poster" src={`${posterBase}${poster}`} alt="film pic" />
      <div className="filmCard__description">
        <div className="filmCard__header">
          <div className="filmCard__title">{title}</div>
          <div className="filmCard__avgRating" style={{ borderColor: colorBorder }}>
            {avgRating}
          </div>
        </div>
        <div className="filmCard__date">{formatedDate}</div>
        <div className="filmCard__genres">{formatedFilmGenres}</div>
        <div className="filmCard__overview">{cutOverview(`${overview}`, 200)}</div>
        <RateBar id={id} rating={rating} />
      </div>
    </div>
  );
}

export default Film;
