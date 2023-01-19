import { MoviedbConsumer } from '../moviedb-context';
import { Rate } from 'antd';

function RateBar({ id, rating }) {
  return (
    <MoviedbConsumer>
      {({ rateFilm }) => (
        <Rate
          allowHalf
          className="filmCard__rate"
          defaultValue={rating}
          count={10}
          onChange={(value) => rateFilm(id, value)}
          style={{
            fontSize: 16,
          }}
        />
      )}
    </MoviedbConsumer>
  );
}

export default RateBar;
