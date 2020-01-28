import React, { createContext, useState, useRef } from 'react';
import { BOARD_ROW, BOARD_COL, FIXED_COLOR } from './constants';
import PathFinder from 'algorithms/index.js';

const Context = createContext();
const _begin = { x: 7, y: 2 };
const _end = { x: 1, y: 9 };
const _board = new Array(BOARD_ROW);
for(let i=0; i<BOARD_ROW; i++){
  _board[i] = [];
  for(let j=0; j<BOARD_COL; j++){
    _board[i][j] = {};
  }
}
_board[_begin.x][_begin.y] = { color: FIXED_COLOR, visit: true };
_board[_end.x][_end.y].color = FIXED_COLOR;

const Provider = (props) => {

  const [begin, setBegin] = useState(_begin);
  const [end, setEnd] = useState(_end);
  const [board, setBoard] = useState(_board);
  const pathFinder = useRef(PathFinder.dijkstra);

  return (
    <Context.Provider value={{
      begin, setBegin,
      end, setEnd,
      board, setBoard,
      pathFinder
    }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { Context, Provider };