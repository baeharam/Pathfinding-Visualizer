// @flow

import React, { useContext, useState } from 'react';
import { Context, type ContextType } from 'Provider';
import { 
  CLICKED_COLOR, INITIAL_COLOR, 
  KEYS, BOARD, ITEM_CLICKED, ITEM_INITIAL
} from 'constants.js';
import './Board.scss';
import Item from '../Item/Item';

const Board = () => {
  const context = useContext<ContextType>(Context);
  const { updateItem } = context;
  const [clicking, setClicking] = useState<boolean>(false);

  const onMouseDown = () => {
    setClicking(true);
  };
  const onMouseUp = () => {
    setClicking(false);
  };

  const changeColor = (e : ElementEvent<HTMLDivElement>, mouseMove : boolean) => {
    if (e.target.className !== 'board__item') return;
    const bg = e.target.style.backgroundColor;
    if (bg !== INITIAL_COLOR && bg !== CLICKED_COLOR) return;

    const ridx = e.target.dataset.ridx;
    const cidx = e.target.dataset.cidx;

    const itemType = (bg === CLICKED_COLOR && !mouseMove ? ITEM_INITIAL : ITEM_CLICKED);
    updateItem(ridx, cidx, itemType);
  };

  const onClick = (e : ElementEvent<HTMLDivElement>) => {
    changeColor(e, false);
  };

  const onMouseMove = (e : ElementEvent<HTMLDivElement>) => {
    if (!clicking) return;
    changeColor(e, true);
  };

  return (
    <div className="board"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onClick={onClick}>

      {BOARD.map((row,ridx) => (
        <div className="board__row" key={ridx}>
          {row.map((col, cidx) => (
            <Item
              ridx={ridx}
              cidx={cidx}
              key={KEYS[ridx][cidx]}
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