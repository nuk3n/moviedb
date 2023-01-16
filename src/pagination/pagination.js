/* eslint-disable */
import { Pagination } from 'antd';
import './pagination.css';
import React from 'react';

function PagePagination({ totalFilms, onPageChange }) {
  return (
    <Pagination
      total={totalFilms}
      defaultPageSize={20}
      showSizeChanger={false}
      onChange={(value) => onPageChange(value)}
    />
  );
}

export default PagePagination;
