// @flow

import React, { useContext, useState } from 'react';
import { Context, type ContextType } from 'Provider';
import { CLICKED_COLOR, INITIAL_COLOR, KEYS } from 'constants.js';
import './Board.scss';

const Board = () => {
  const context = useContext<ContextType>(Context);
  const { board, setBoard } = context;
  const [clicking, setClicking] = useState<boolean>(false);

  const onMouseDown = () => {
    setClicking(true);
  };
  const onMouseUp = () => {
    setClicking(false);
  };

  const changeColor = (e : ElementEvent<HTMLDivElement>) => {
    if (e.target.className !== 'board__col') return;
    if (e.target.style.backgroundColor === INITIAL_COLOR) return;
    const data : DOMStringMap = e.target.dataset;
    const ridx = parseInt(data.ridx), cidx = parseInt(data.cidx);
    const copy = JSON.parse(JSON.stringify(board));
    copy[ridx][cidx].color = CLICKED_COLOR;
    setBoard(copy);
  }

  const onClick = (e : ElementEvent<HTMLDivElement>) => {
    changeColor(e);
  };

  const onMouseMove = (e : ElementEvent<HTMLDivElement>) => {
    if (!clicking) return;
    changeColor(e);
  };

  return (
    <div className="board" 
      onMouseDown={onMouseDown} 
      onMouseUp={onMouseUp} 
      onClick={onClick} 
      onMouseMove={onMouseMove}>

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