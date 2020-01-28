import React, { useState, useRef } from 'react';
import PriorityQueue from 'js-priority-queue';

const App = () => {

  const [board, setBoard] = useState(Array(10).fill(Array(10).fill(null)));
  
  const dist = new Array(10);
  for(let i=0; i<10; i++) dist[i] = new Array(10).fill(Infinity);
  const dx = [-1,1,0,0];
  const dy = [0,0,-1,1];

  const begin = { row: 7, col: 2 };
  dist[7][2] = 0;


  const onButtonClick = () => {
    const temp = JSON.parse(JSON.stringify(board));
    const q = new PriorityQueue({ comparator : (a,b) => a.d - b.d });
    q.queue({ x: begin.row, y: begin.col, d: 0})
    while(q.length){
      const cur = q.peek(); q.dequeue();
      const x = cur.x, y = cur.y, d = cur.d;
      console.log(dist);
      if(d > dist[x][y]) continue;
      for(let i=0; i<4; i++){
        const _dx = x + dx[i];
        const _dy = y + dy[i];
        if(_dx < 0 || _dx >= 10 || _dy < 0 || _dy >= 10) continue;
        if(dist[x][y]+1 >= dist[_dx][_dy]) continue;
        temp[_dx][_dy] = 'yellow';
        dist[_dx][_dy] = dist[x][y] + 1;
        q.queue({x: _dx, y: _dy, d: dist[_dx][_dy]});
      }
      const copy = JSON.parse(JSON.stringify(temp));
      setTimeout(() => {setBoard(copy)},1000*d);
    }
  };

  return (
    <>
      {board.map((row,ridx) => (
        <div key={ridx} style={{ display: 'flex' }}>
          {row.map((col, cidx) => {
            const bg = (begin.row === ridx && begin.col === cidx ? 'black' : null);
            const color = board[ridx][cidx];
            return <div key={cidx+color} style={{
              width: '64px',
              height: '64px',
              border: '1px solid black',
              backgroundColor: (bg || color)
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
