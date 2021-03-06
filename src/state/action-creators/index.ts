import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import {
  Action,
  UpdateCell,
  MoveCell,
  DeleteCell,
  InsertCellAfter,
} from '../actions';
import { CellTypes } from '../cell';
import { Direction } from '../actions';
import bundle from '../../bundler';
export const updateCell = (id: string, content: string): UpdateCell => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCell => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCell => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertCellAfter => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId: cellId,
      },
    });
    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_END,
      payload: {
        cellId,
        output: result,
      },
    });
  };
};
