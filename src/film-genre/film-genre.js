import { MoviedbConsumer } from '../moviedb-context';

function FilmGenre({ genreId }) {
  return (
    <MoviedbConsumer>
      {({ genresList }) => {
        const filmGenre = genresList.find((el) => el.id === genreId);
        return (
          <span key={filmGenre.id} className="filmCard__genre">
            {filmGenre.name}
          </span>
        );
      }}
    </MoviedbConsumer>
  );
}

export default FilmGenre;
