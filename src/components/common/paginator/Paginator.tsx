import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';

import { calculatePagination } from '../../../store/pagination/actions';
import { IPaginationState } from '../../../store/pagination/reducer';


export interface IAppProps {
  count: number;
  pagination: IPaginationState;
  calculatePagination: (totalItems: number, currentPage?: number, pageSize?: number) => void;
}

class Paginator extends Component<IAppProps> {

  public componentWillMount() {
    if (!!this.props.count) {
      this.calculatePagination();
    }
  }

  public componentDidUpdate(prevProps: IAppProps) {
    if (this.props.count !== prevProps.count) {
      this.calculatePagination();
    }
  }

  public render() {
    const { pagination } = this.props;
    if (!this.props.count) {
      return null;
    }

    const pagesJSX: JSX.Element[] = pagination.pages.map((page, index) => (
      <Pagination.Item
        key={index}
        active={pagination.currentPage === page}
        onClick={() => this.setPage(page)}
      >
        {page}
      </Pagination.Item>
    ));

    return (
      <Pagination size="sm" className="justify-content-center">
        <Pagination.First
          onClick={() => this.setPage(1)}
          disabled={pagination.currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => this.setPage(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
        />
        {pagesJSX}
        <Pagination.Next
          onClick={() => this.setPage(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
        />
        <Pagination.Last
          onClick={() => this.setPage(pagination.totalPages)}
          disabled={pagination.currentPage === pagination.totalPages}
        />
      </Pagination>
    );
  }

  private calculatePagination = (currentPage = 1) => {
    this.props.calculatePagination(this.props.count, currentPage);
  }

  private setPage = (page: number) => {
    this.calculatePagination(page);
  }

}

const mapStateToProps = ({ pagination }: { pagination: IPaginationState }) => ({ pagination });
const mapDispatchToProps = ({ calculatePagination });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Paginator);
