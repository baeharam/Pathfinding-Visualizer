// @flow

import React, { useContext, useState } from 'react';
import { Context, type ContextType } from 'Provider';
import { CLICKED_COLOR, INITIAL_COLOR, FIXED_COLOR, KEYS } from 'constants.js';
import './Board.scss';

const Board = () => {
  const context = useContext<ContextType>(Context);
  const { board, setBoard, setBegin, setEnd, begin, end } = context;
  const [clicking, setClicking] = useState<boolean>(false);

  const onMouseDown = () => {
    setClicking(true);
  };
  const onMouseUp = () => {
    setClicking(false);
  };

  const changeColor = (e : ElementEvent<HTMLDivElement>, type='WALL') => {
    if (e.target.className !== 'board__col') return;
    if (e.target.style.backgroundColor !== INITIAL_COLOR) return;
    const data : DOMStringMap = e.target.dataset;
    const ridx = parseInt(data.ridx), cidx = parseInt(data.cidx);
    const copy = JSON.parse(JSON.stringify(board));

    switch (type) {
      case 'WALL':
        copy[ridx][cidx].color = CLICKED_COLOR;
        break;
      case 'BEGIN':
        copy[begin.x][begin.y].color = INITIAL_COLOR;
        copy[ridx][cidx].color = FIXED_COLOR;
        setBegin({x: ridx, y: cidx});
        break;
      case 'END':
        copy[end.x][end.y].color = INITIAL_COLOR;
        copy[ridx][cidx].color = FIXED_COLOR;
        setEnd({x: ridx, y: cidx});
        break;
      default:
        throw new Error('Invalid type');
    }
    setBoard(copy);
  }

  const onClick = (e : ElementEvent<HTMLDivElement>) => {
    let type = 'WALL';
    if (e.ctrlKey) {
      type = 'BEGIN';
    } else if (e.altKey) {
      type = 'END';
    }
    changeColor(e, type);
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
      onMouseMove={onMouseMove}
      tabIndex="0">

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