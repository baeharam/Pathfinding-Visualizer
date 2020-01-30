// @flow

import React, { createContext, useState, useRef, type Node } from 'react';
import { BOARD_ROW, BOARD_COL, FIXED_COLOR, INITIAL_COLOR } from './constants';
import PathFinder from 'algorithms/pathFinder';

type PositionType = {|x: number, y: number|};
type BoardType = Array<Array<{|color: string, visit: boolean|}>>;

export type ContextType = {|
  begin: PositionType,
  end: PositionType,
  setBegin: (PositionType) => void,
  setEnd: (PositionType) => void,
  board: BoardType,
  setBoard: (BoardType) => void,
  isPathExist: boolean,
  setIsPathExist: (boolean) => void,
  clear: (void) => void,
  pathFinder: any,
|};

const Context = createContext<ContextType>();
let _begin = { x: 7, y: 2 };
let _end = { x: 11, y: 25 };
const _board : BoardType = new Array(BOARD_ROW);
for(let i=0; i<BOARD_ROW; i++){
  _board[i] = [];
  for(let j=0; j<BOARD_COL; j++){
    _board[i][j] = {
      color: INITIAL_COLOR,
      visit: false
    };
  }
}
_board[_begin.x][_begin.y] = { color: FIXED_COLOR, visit: true };
_board[_end.x][_end.y] = { color: FIXED_COLOR, visit: false };

const Provider = (props : {| children: Node |}) => {

  const [begin, setBegin] = useState<PositionType>(_begin);
  const [end, setEnd] = useState<PositionType>(_end);
  const [board, setBoard] = useState<BoardType>(_board);
  const [isPathExist, setIsPathExist] = useState<boolean>(true);
  const pathFinder = useRef<any>(null);

  const _clearPoints = () => {
    _board[_begin.x][_begin.y] = { color: INITIAL_COLOR, visit: false };
    _board[_end.x][_end.y] = { color: INITIAL_COLOR, visit: false };
    _board[begin.x][begin.y] = { color: FIXED_COLOR, visit: true };
    _board[end.x][end.y] = { color: FIXED_COLOR, visit: false };
    _begin = begin;
    _end = end;
  };

  const clear = () => {
    _clearPoints()
    setBoard(_board);
    if (isPathExist === false) {
      setIsPathExist(true);
    }
    if (pathFinder.current instanceof PathFinder) {
      pathFinder.current.clear(_board);
    }
  };

  return (
    <Context.Provider value={{
      begin, setBegin,
      end, setEnd,
      board, setBoard,
      pathFinder,clear,
      isPathExist, setIsPathExist,
    }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { Context, Provider };