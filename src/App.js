import React, { useState, useEffect, useRef } from 'react';
import { BOARD_ROW, BOARD_COL, FIXED_COLOR } from './constants';
import Dijkstra from './algorithms/dijkstra';

const begin = { x: 7, y: 2 };
const end = { x: 1, y: 9 };
const arr = new Array(BOARD_ROW);
for(let i=0; i<BOARD_ROW; i++){
  arr[i] = [];
  for(let j=0; j<BOARD_COL; j++){
    arr[i][j] = {};
  }
}
arr[begin.x][begin.y] = { color: FIXED_COLOR, visit: true};
arr[end.x][end.y].color = FIXED_COLOR;

const App = () => {

  const [board, setBoard] = useState(arr);
  const _dijkstra = new Dijkstra({ begin, end, board, setState: setBoard, delay: 100 });
  const dijkstra = useRef(_dijkstra);

  const onButtonClick = () => {
    dijkstra.current.execute();
  };

  useEffect(() => {
    if(board[end.x][end.y].visit) {
      dijkstra.current.paintShortestPath();
    }
  }, [board, dijkstra]);

  return (
    <>
      {board.map((row,ridx) => (
        <div key={ridx} style={{ display: 'flex' }}>
          {row.map((col, cidx) => {
            return <div key={2*ridx+cidx} style={{
              width: '64px',
              height: '64px',
              border: '1px solid black',
              backgroundColor: (board[ridx][cidx].color || null)
            }}></div>
          })}
          <br/>
        </div>
      ))}
      <button onClick={onButtonClick}>시작</button>
    </>
  );
};

export default App;
