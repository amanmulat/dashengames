// src/reducers/board.reducer.ts
import { SET_BOARD_DIMENSIONS } from '../constants';

interface BoardState {
  rows: number;
  columns: number;
}

interface SetBoardDimensionsAction {
  type: typeof SET_BOARD_DIMENSIONS;
  payload: {
    rows: number;
    columns: number;
  };
}

type BoardAction = SetBoardDimensionsAction;

const defaultState: BoardState = {
  rows: 2,
  columns: 2,
};

const boardReducer = (
  state: BoardState = defaultState,
  action: BoardAction,
): BoardState => {
  switch (action.type) {
    case SET_BOARD_DIMENSIONS: {
      const { rows, columns } = action.payload;
      return { ...state, rows, columns };
    }
    default:
      return state;
  }
};

export default boardReducer;
