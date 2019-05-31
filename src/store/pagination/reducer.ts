import { Reducer } from "redux";
import { SET_PAGINATION } from "./actions";

export interface IPaginationState {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
}

const INITIAL_STATE = {
  totalPages: 1,
  totalItems: 0,
  currentPage: 1,
  pageSize: 10,
  startPage: 0,
  endPage: 0,
  startIndex: 0,
  endIndex: 0,
  pages: [],
}

const paginationReducer: Reducer<IPaginationState, any> = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_PAGINATION:
      return {
        ...state,
        ...payload,
      }
    default:
      return state;
  }
}
export default paginationReducer;