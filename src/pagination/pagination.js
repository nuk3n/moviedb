import { Pagination } from 'antd';
import './pagination.css';

function PagePagination({ totalFilms, onPageChange }) {
  return (
    <Pagination
      class="movie__pagination"
      total={totalFilms}
      defaultPageSize={20}
      showSizeChanger={false}
      onChange={(value) => onPageChange(value)}
    />
  );
}

export default PagePagination;
