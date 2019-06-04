import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';

import { IPaginationState } from '../../../store/pagination/reducer';
import { calculatePagination } from '../../../store/pagination/actions';


export interface IAppProps {
  count: number;
  pagination: IPaginationState;
  calculatePagination: (totalItems: number, currentPage?: number, pageSize?: number) => void;
}

class Paginations extends Component<IAppProps> {

  componentWillMount() {
    if (!!this.props.count) {
      this.calculatePagination();
    }
  }

  componentDidUpdate(prevProps: IAppProps) {
    if (this.props.count !== prevProps.count) {
      this.calculatePagination();
    }
  }

  private calculatePagination = (currentPage = 95) => {
    this.props.calculatePagination(this.props.count, currentPage);
  }
  private setPage = (page: number) => {
    this.calculatePagination(page);
  }

  render() {
    const { pagination } = this.props;
    if(!this.props.count){
      return null;
    }

    return (
      <Pagination size="sm" className="justify-content-center">
        <Pagination.First onClick={() => this.setPage(1)} disabled={pagination.currentPage === 1} />
        <Pagination.Prev onClick={() => this.setPage(pagination.currentPage - 1)} disabled={pagination.currentPage === 1} />
        {pagination.pages.map((page, index) =>
          <Pagination.Item key={index} active={pagination.currentPage === page} onClick={() => this.setPage(page)}>{page}</Pagination.Item>
        )}
        <Pagination.Next onClick={() => this.setPage(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.totalPages} />
        <Pagination.Last onClick={() => this.setPage(pagination.totalPages)} disabled={pagination.currentPage === pagination.totalPages} />
      </Pagination>
    )
  }
}

const mapStateToProps = ({ pagination }: { pagination: IPaginationState }) => ({ pagination })
const mapDispatchToProps = ({ calculatePagination });
export default connect(mapStateToProps, mapDispatchToProps)(Paginations)