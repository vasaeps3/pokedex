import React, { Component } from 'react';

export interface IAppProps {
  count: number;
  // items: any[];
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
  pages: any,
}

export default class Pagination extends Component<IAppProps, IAppState> {

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
      pages: {},
    }
  };

  componentWillMount() {
    // if (this.props.items && this.props.items.length) {
    this.setPage(1);
    // }
  }

  // component

  componentDidUpdate(prevProps: IAppProps, prevState: any) {
    console.log('componentDidUpdate');
    console.log(prevProps, this.props);
    if (this.props.count !== prevProps.count) {
      this.setPage(1);
    }
    // // reset page if items array has changed
    // if (this.props.items !== prevProps.items) {
    // }
  }

  private setPage(page: number) {
    let pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    pager = this.getPager(this.props.count, page);
    console.log(this.props);
  }

  getPager(totalItems: number, currentPage = 1, pageSize = 20): IPagination {
    console.log(totalItems);
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage = 0;
    let endPage = 0;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // const pages = [...Array().keys()].map(i => startPage + i);
    console.log(startPage);
    console.log(endPage);
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages: {},
    }
  }

  render() {
    // this.getPager(100);
    const pager = this.state.pager;
    return (
      <ul className="pagination">
        <li className={`page-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => this.setPage(1)}>First</button >
        </li>
      </ul>
    )
  }
}
