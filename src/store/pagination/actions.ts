import times from 'lodash/times';
import { Dispatch } from 'redux';

export const SET_PAGINATION = 'SET_PAGINATION';

export const calculatePagination = (totalItems: number, currentPage = 1, pageSize = 10) => {
  return (dispatch: Dispatch) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage = 0;
    let endPage = 0;
    if (totalPages <= 6) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 4) {
        startPage = 1;
        endPage = 6;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 5;
        endPage = totalPages;
      } else {
        startPage = currentPage - 3;
        endPage = currentPage + 2;
      }
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages: number[] = times((endPage + 1) - startPage).map((i) => startPage + i);

    dispatch({
      type: SET_PAGINATION,
      payload: {
        totalItems,
        currentPage,
        pageSize,
        totalPages,
        startPage,
        endPage,
        startIndex,
        endIndex,
        pages,
      },
    });
  };
};
