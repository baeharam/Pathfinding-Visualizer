import React, { useContext, useState } from 'react';
import { Context } from 'Provider';
import { CLICKED_COLOR, INITIAL_COLOR } from 'constants.js';
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

  const changeColorHandler = (ridx, cidx) => {
    return () => {
      const copy = JSON.parse(JSON.stringify(board));
      copy[ridx][cidx].color = CLICKED_COLOR;
      setBoard(copy);
    };
  };

  return (
    <div className="board" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      {board.map((row,ridx) => (
        <div className="board__row" key={ridx} style={{ display: 'flex', justifyContent: 'center'}}>
          {row.map((col, cidx) => {
            let onMouseMove = null;
            if (board[ridx][cidx].color === INITIAL_COLOR && clicking) {
              onMouseMove = changeColorHandler(ridx, cidx);
            }

            return (
              <div 
                className="board__col" 
                key={2*ridx+cidx}
                onMouseMove={onMouseMove}
                onClick={changeColorHandler(ridx, cidx)}
                style={{
                  background: board[ridx][cidx].color,
                  transition: (clicking ? 'none' : 'background-color 0.3s linear')
                }} 
              />
            )
          })}
          <br/>
        </div>
      ))}
    </div>
  );
};

export default Board;