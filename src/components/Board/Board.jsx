import React, { useContext, useState } from 'react';
import { Context } from 'Provider';
import { CLICKED_COLOR, INITIAL_COLOR, KEYS } from 'constants.js';
import './Board.scss';

const Board = ({ name, ref }) => {
  const context = useContext(Context);
  const { board, setBoard } = context;
  const [clicking, setClicking] = useState(false);
  const onMouseDown = () => {
    setClicking(true);
  };
  const onMouseUp = () => {
    setClicking(false);
  };

  const changeColor = (e) => {
    if (e.target.className !== 'board__col') return;
    if (e.target.style.backgroundColor === INITIAL_COLOR) return;
    const data = e.target.dataset;
    const ridx = data.ridx*1, cidx = data.cidx*1;
    const copy = JSON.parse(JSON.stringify(board));
    copy[ridx][cidx].color = CLICKED_COLOR;
    setBoard(copy);
  }

  const onClick = (e) => {
    changeColor(e);
  };

  const onMouseMove = (e) => {
    if (!clicking) return;
    changeColor(e);
  };

  return (
    <div className="board" onMouseDown={onMouseDown} onMouseUp={onMouseUp} onClick={onClick} onMouseMove={onMouseMove}>
      {board.map((row,ridx) => (
        <div className="board__row" key={ridx} style={{ display: 'flex', justifyContent: 'center'}}>
          {row.map((col, cidx) => (
            <div 
              className="board__col"
              key={KEYS[ridx][cidx]}
              data-ridx={ridx}
              data-cidx={cidx}
              style={{
                background: board[ridx][cidx].color,
                transition: (clicking ? 'none' : 'background-color 0.3s linear')
              }} 
            />
            )
          )}
          <br/>
        </div>
      ))}
    </div>
  );
};

export default Board;