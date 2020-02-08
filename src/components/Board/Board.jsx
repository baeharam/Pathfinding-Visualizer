// @flow

import React, { useContext, useState, useRef } from 'react';
import { Context, type ContextType } from 'Provider';
import { KEYS, BOARD, ITEM_CLICKED, ITEM_INITIAL } from 'constants.js';
import './Board.scss';
import Item from '../Item/Item';

const Board = () => {
  const context = useContext<ContextType>(Context);
  const { updateItem, begin, end, isVisualized } = context;
  const [clicking, setClicking] = useState<boolean>(false);
  const [dragging, setDragging] = useState<{| begin: boolean, end: boolean |}>({
    begin: false,
    end: false,
  });
  const clickPos = useRef<{|x: number, y: number|}>({ x: -1, y: -1 });

  const onMouseDown = (e: ElementEvent<HTMLDivElement>) => {
    const ridx = Number(e.target.dataset.ridx);
    const cidx = Number(e.target.dataset.cidx);

    if (ridx === begin.current.x && cidx === begin.current.y) {
      setDragging({ begin: true, end: false });
    } else if (ridx === end.current.x && cidx === end.current.y) {
      setDragging({ begin: false, end: true });
    } else {
      clickPos.current = { x: ridx, y: cidx };
      setClicking(true);
    }
  };
  const onMouseUp = () => {
    setClicking(false);
    setDragging({ begin: false, end: false });
  };

  const changeColor = (e: ElementEvent<HTMLDivElement>, mouseMove: boolean) => {
    if (e.target.className !== 'board__item') return;
    const { type } = e.target.dataset;
    if (type !== ITEM_INITIAL && type !== ITEM_CLICKED) return;

    const ridx = Number(e.target.dataset.ridx);
    const cidx = Number(e.target.dataset.cidx);

    const itemType =
      type === ITEM_CLICKED && !mouseMove ? ITEM_INITIAL : ITEM_CLICKED;
    updateItem(ridx, cidx, itemType);
  };

  const onClick = (e: ElementEvent<HTMLDivElement>) => {
    if (isVisualized) return;
    changeColor(e, false);
  };

  const onMouseMove = (e: ElementEvent<HTMLDivElement>) => {
    if (isVisualized) return;
    if (e.target.className !== 'board__item') return;
    const ridx = Number(e.target.dataset.ridx);
    const cidx = Number(e.target.dataset.cidx);

    if (dragging.begin || dragging.end) {
      const formerX = dragging.begin ? begin.current.x : end.current.x;
      const formerY = dragging.begin ? begin.current.y : end.current.y;

      updateItem(formerX, formerY, ITEM_INITIAL);

      const next = { x: ridx, y: cidx };

      if (dragging.begin) {
        begin.current = next;
      } else {
        end.current = next;
      }

      updateItem(next.x, next.y);
    } else {
      if (!clicking) return;
      if (clickPos.current.x === ridx && clickPos.current.y === cidx) return;
      changeColor(e, true);
    }
  };

  return (
    <div
      className="board"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onClick={onClick}
      role="button"
      tabIndex="0"
    >
      {BOARD.map((row, ridx) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="board__row" key={ridx}>
          {row.map((col, cidx) => (
            <Item ridx={ridx} cidx={cidx} key={KEYS[ridx][cidx]} />
          ))}
          <br />
        </div>
      ))}
    </div>
  );
};

export default Board;
