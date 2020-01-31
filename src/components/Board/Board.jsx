// @flow

import React, { useContext, useState } from 'react';
import { Context, type ContextType } from 'Provider';
import { 
  KEYS, BOARD, ITEM_CLICKED, ITEM_INITIAL
} from 'constants.js';
import './Board.scss';
import Item from '../Item/Item';

const Board = () => {
  const context = useContext<ContextType>(Context);
  const { updateItem, begin, end } = context;
  const [clicking, setClicking] = useState<boolean>(false);
  const [dragging, setDragging] = useState<{|begin: boolean, end: boolean|}>({ begin: false, end: false });

  const onMouseDown = (e : ElementEvent<HTMLDivElement>) => {
    const ridx = parseInt(e.target.dataset.ridx);
    const cidx = parseInt(e.target.dataset.cidx);

    if (ridx === begin.current.x && cidx === begin.current.y) {
      setDragging({ begin: true, end: false });
    } else if (ridx === end.current.x && cidx === end.current.y) {
      setDragging({ begin: false, end: true });
    } else {
      setClicking(true);
    }
  };
  const onMouseUp = () => {
    setClicking(false);
    setDragging({ begin: false, end: false });
  };

  const changeColor = (e : ElementEvent<HTMLDivElement>, mouseMove : boolean) => {
    if (e.target.className !== 'board__item') return;
    const type = e.target.dataset.type;
    if (type !== ITEM_INITIAL && type !== ITEM_CLICKED) return;

    const ridx = parseInt(e.target.dataset.ridx);
    const cidx = parseInt(e.target.dataset.cidx);

    const itemType = (type === ITEM_CLICKED && !mouseMove ? ITEM_INITIAL : ITEM_CLICKED);
    updateItem(ridx, cidx, itemType);
  };

  const onClick = (e : ElementEvent<HTMLDivElement>) => {
    changeColor(e, false);
  };

  const onMouseMove = (e : ElementEvent<HTMLDivElement>) => {
    if (e.target.className !== 'board__item') return;
    const ridx = parseInt(e.target.dataset.ridx);
    const cidx = parseInt(e.target.dataset.cidx);

    if (dragging.begin || dragging.end) {
      const formerX = (dragging.begin ? begin.current.x : end.current.x);
      const formerY = (dragging.begin ? begin.current.y : end.current.y);

      updateItem(formerX, formerY, ITEM_INITIAL);

      const next = { x: ridx, y: cidx };
      dragging.begin ? (begin.current = next) : (end.current = next);

      updateItem(next.x, next.y);
    } else {
      if (!clicking) return;
      changeColor(e, true);  
    }
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