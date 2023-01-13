/* eslint-disable */
import './film.css';
import { format } from 'date-fns';

function Film(props) {
  const { filmData, posterBase } = props;
  const { title, date, poster, overview } = filmData;
  const formatedDate = date ? format(new Date(date), 'MMMM d, yyyy') : null;

  function cutOverview(text, maxLength) {
    if (text.length < maxLength) return text;
    let newText = text.slice(0, maxLength - 3);
    return newText.slice(0, newText.lastIndexOf(' ')) + ' ...';
  }

  return (
    <div className="filmCard">
      <img className="filmCard__poster" src={`${posterBase}${poster}`} alt="film pic" />
      <div className="filmCard__description">
        <span className="filmCard__title">{title}</span>
        <div className="filmCard__date">{formatedDate}</div>
        <div className="filmCard__genres">
          <span className="filmCard__genre">Action</span>
          <span className="filmCard__genre">Drama</span>
        </div>
        <div className="filmCard__overview">{cutOverview(`${overview}`, 170)}</div>
      </div>
    </div>
  );
}

export default Film;
