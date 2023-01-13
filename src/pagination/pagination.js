/* eslint-disable */
import { Pagination } from 'antd';
import './pagination.css';
import React from 'react';

function PagePagination({ total, onPageChange }) {
  return (
    <Pagination total={total} defaultPageSize={20} showSizeChanger={false} onChange={(value) => onPageChange(value)} />
  );
}

export default PagePagination;
