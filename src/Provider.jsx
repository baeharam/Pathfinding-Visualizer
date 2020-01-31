// @flow

import React, { createContext, useRef, useState, type Node } from 'react';
import { BOARD, KEYS, DELAY_NORMAL, ITEM_INITIAL, ITEM_FIXED, BOARD_ROW, BOARD_COL } from './constants';

type PositionType = {|x: number, y: number|};
type SetItemCacheType = { [key: string] : (string) => void };

export type ContextType = {|
  isPathExist: { current: boolean },
  begin: { current: PositionType },
  end: { current: PositionType },
  board: { current: Array<Array<string>> },
  isPathExist: { current: boolean },
  setItemCache: { current: SetItemCacheType },
  pathFinder: { current: any },
  delay: { current: number },

  clear: (void) => void,
  updateItem: (number, number, string, number) => void,
  setIsPathExist: (boolean) => void
|};

const Context = createContext<ContextType>();

const Provider = (props : { children: Node }) => {

  const [isPathExist, setIsPathExist] = useState<boolean>(true);
  const begin = useRef<PositionType>({ x: Math.round(BOARD_ROW/2), y: 2})
  const end = useRef<PositionType>({ x: Math.round(BOARD_ROW/2), y: BOARD_COL-3})
  const board = useRef<Array<Array<string>>>(BOARD);
  const setItemCache = useRef<SetItemCacheType>({});
  const pathFinder = useRef<any>(null);
  const delay = useRef<number>(DELAY_NORMAL);

  const updateItem = (ridx, cidx, type = ITEM_FIXED, timeFactor = null) => {
    board.current[ridx][cidx] = type;
    const setItem = setItemCache.current[KEYS[ridx][cidx]];

    if (timeFactor) {
      const timer = 
        setTimeout(() => { setItem(type); }, timeFactor*delay.current);
      pathFinder.current.timers.push(timer);
    } else {
      setItem(type);
    }
  };

  const clear = () => {
    if (!isPathExist) setIsPathExist(true);
    const currentBoard = board.current;
    currentBoard.forEach((row, ridx) => {
      row.forEach((item, cidx) => {
        const setItem = setItemCache.current[KEYS[ridx][cidx]];
        setItem(ITEM_INITIAL);
      });
    });
  };

  return (
    <Context.Provider value={{
      // Methods
      clear, updateItem, setIsPathExist,

      // Refs
      pathFinder, begin, end, isPathExist,
      board, setItemCache, delay
    }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, Provider };