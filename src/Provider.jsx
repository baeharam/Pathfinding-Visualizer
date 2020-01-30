// @flow

import React, { createContext, useState, useRef, type Node } from 'react';
import { FIXED_COLOR, INITIAL_COLOR, BOARD } from './constants';
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
  moveEndPoints: boolean,
  setMoveEndPoints: (boolean) => void
|};

const Context = createContext<ContextType>();
let _begin = { x: 7, y: 2 };
let _end = { x: 11, y: 25 };
BOARD[_begin.x][_begin.y] = { color: FIXED_COLOR, visit: true };
BOARD[_end.x][_end.y] = { color: FIXED_COLOR, visit: false };

const Provider = (props : {| children: Node |}) => {

  const [begin, setBegin] = useState<PositionType>(_begin);
  const [end, setEnd] = useState<PositionType>(_end);
  const [board, setBoard] = useState<BoardType>(BOARD);
  const [isPathExist, setIsPathExist] = useState<boolean>(true);
  const [moveEndPoints, setMoveEndPoints] = useState<boolean>(false);
  const pathFinder = useRef<any>(null);

  const _clearPoints = () => {
    BOARD[_begin.x][_begin.y] = { color: INITIAL_COLOR, visit: false };
    BOARD[_end.x][_end.y] = { color: INITIAL_COLOR, visit: false };
    BOARD[begin.x][begin.y] = { color: FIXED_COLOR, visit: true };
    BOARD[end.x][end.y] = { color: FIXED_COLOR, visit: false };
    _begin = begin;
    _end = end;
  };

  const clear = () => {
    _clearPoints()
    setBoard(BOARD);
    if (isPathExist === false) {
      setIsPathExist(true);
    }
    if (pathFinder.current instanceof PathFinder) {
      pathFinder.current.clear(BOARD);
    }
  };

  return (
    <Context.Provider value={{
      begin, setBegin,
      end, setEnd,
      board, setBoard,
      pathFinder,clear,
      isPathExist, setIsPathExist,
      moveEndPoints, setMoveEndPoints
    }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { Context, Provider };