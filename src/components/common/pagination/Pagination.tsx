import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import times from 'lodash/times';


export interface IAppProps {
  count: number;
  onChangePage: (offset: number, limit: number) => void;
}

export interface IAppState {
  pager: IPagination;
}

interface IPagination {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[],
}

export default class Paginations extends Component<IAppProps, IAppState> {
  state = {
    pager: {
      totalPages: 1,
      totalItems: 0,
      currentPage: 0,
      pageSize: 0,
      startPage: 0,
      endPage: 0,
      startIndex: 0,
      endIndex: 0,
      pages: [],
    }
  };

  componentWillMount() {
    this.props.onChangePage(0, 20);
  }

  componentDidUpdate(prevProps: IAppProps, prevState: any) {
    if (this.props.count !== prevProps.count) {
      this.setPage(1, true);
    }
  }

  private setPage(page: number, isFirst = false) {
    let pager: IPagination = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    pager = this.getPager(this.props.count, page);
    this.setState({ pager });

    if (!isFirst) {
      this.props.onChangePage((pager.currentPage - 1) * pager.pageSize, pager.pageSize);
    }
  }

  getPager(totalItems: number, currentPage = 1, pageSize = 20): IPagination {
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

    const pages: number[] = times((endPage + 1) - startPage).map(i => startPage + i);

    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    }
  }

  render() {
    const pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }

    return (
      <Pagination size="sm" className="justify-content-center">
        <Pagination.First onClick={() => this.setPage(1)} disabled={pager.currentPage === 1} />
        <Pagination.Prev onClick={() => this.setPage(pager.currentPage - 1)} disabled={pager.currentPage === 1} />
        {pager.pages.map((page, index) =>
          <Pagination.Item key={index} active={pager.currentPage === page} onClick={() => this.setPage(page)}>{page}</Pagination.Item>
        )}
        <Pagination.Next onClick={() => this.setPage(pager.currentPage + 1)} disabled={pager.currentPage === pager.totalPages} />
        <Pagination.Last onClick={() => this.setPage(pager.totalPages)} disabled={pager.currentPage === pager.totalPages} />
      </Pagination>
    )
  }
}
