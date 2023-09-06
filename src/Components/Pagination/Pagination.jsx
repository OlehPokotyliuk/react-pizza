import React from 'react';
import ReactPaginate from 'react-paginate';
import classes from './Pagination.module.scss';

export const Pagination = ({onChangePage}) => {
  return (
    <ReactPaginate className={classes.main}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={e=>onChangePage(e.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={3}
    
    renderOnZeroPageCount={null}
  />
  );
};

