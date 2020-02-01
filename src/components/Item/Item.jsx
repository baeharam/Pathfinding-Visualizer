// @flow

import React, { useState, useContext, useEffect } from 'react';
import { Context } from 'Provider';
import {
  INITIAL_COLOR,
  VISITED_COLOR,
  KEYS,
  FIXED_COLOR,
  ITEM_INITIAL,
  ITEM_VISITED,
  ITEM_CLICKED,
  CLICKED_COLOR,
  ITEM_SHORTEST,
  SHORTEST_COLOR,
} from 'constants.js';
import './Item.scss';

const Item = ({ ridx, cidx }: { ridx: number, cidx: number }) => {
  const [type, setType] = useState(ITEM_INITIAL);
  const { setItemCache, begin, end, pathFinder, setIsVisualized } = useContext(
    Context,
  );

  setItemCache.current[KEYS[ridx][cidx]] = setType;

  useEffect(() => {
    if (
      type === ITEM_VISITED &&
      ridx === end.current.x &&
      cidx === end.current.y
    ) {
      pathFinder.current.paintShortestPath();
    }
  }, [type, end, pathFinder, ridx, cidx]);

  useEffect(() => {
    if (
      type === ITEM_SHORTEST &&
      ridx === end.current.x &&
      cidx === end.current.y
    ) {
      pathFinder.current.clearTimers();
      setIsVisualized(false);
    }
  }, [type, end, pathFinder, ridx, cidx, setIsVisualized]);

  const getColor = () => {
    if (
      (ridx === begin.current.x && cidx === begin.current.y) ||
      (ridx === end.current.x && cidx === end.current.y)
    ) {
      return FIXED_COLOR;
    }
    if (type === ITEM_VISITED) {
      return VISITED_COLOR;
    }
    if (type === ITEM_CLICKED) {
      return CLICKED_COLOR;
    }
    if (type === ITEM_SHORTEST) {
      return SHORTEST_COLOR;
    }
    return INITIAL_COLOR;
  };

  return (
    <div
      className="board__item"
      data-type={type}
      data-ridx={ridx}
      data-cidx={cidx}
      style={{
        backgroundColor: getColor(),
      }}
    />
  );
};

export default Item;
