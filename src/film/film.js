/* eslint no-nested-ternary: "off" */
import './film.css';
import icon from './404-error.png';
import RateBar from '../rate-bar';
import FilmGenre from '../film-genre';
import { format } from 'date-fns';
import React from 'react';

import { Spin } from 'antd';

export default class Film extends React.Component {
  state = {
    loading: true,
  };

  onLoadPic = () => {
    this.setState({ loading: false });
  };

  // eslint-disable-next-line class-methods-use-this
  cutOverview(text, maxLength) {
    if (text.length < maxLength) return text;
    const newText = text.slice(0, maxLength - 3);
    return `${newText.slice(0, newText.lastIndexOf(' '))} ...`;
  }

  render() {
    const {
      filmData: { title, date, poster, overview, id, rating, avgRating, filmGenres },
      posterBase,
    } = this.props;
    const { loading } = this.state;
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
    const formatedDate = date ? format(new Date(date), 'MMMM d, yyyy') : null;
    const formatedFilmGenres = filmGenres.map((gId) => <FilmGenre key={gId} genreId={gId} />);

    return (
      <div className="filmCard">
        <div className="filmCard__pic">
          <Spin style={{ display: loading ? 'block' : 'none', alignSelf: 'center' }} />
          <img
            src={`${posterBase}${poster}`}
            style={{ display: loading ? 'none' : 'block' }}
            className="filmCard__poster"
            onLoad={this.onLoadPic}
            /* eslint-disable-next-line no-return-assign */
            onError={(e) => (e.target.src = icon)}
            alt="film pic"
          />
        </div>
        <div className="filmCard__description">
          <div className="filmCard__header">
            <div className="filmCard__title">{title}</div>
            <div className="filmCard__avgRating" style={{ borderColor: colorBorder }}>
              {avgRating}
            </div>
          </div>
          <div className="filmCard__date">{formatedDate}</div>
          <div className="filmCard__genres">{formatedFilmGenres}</div>
          <div className="filmCard__overview">{this.cutOverview(`${overview}`, 200)}</div>
          <RateBar id={id} rating={rating} />
        </div>
      </div>
    );
  }
}
