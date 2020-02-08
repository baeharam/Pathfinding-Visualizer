// @flow

import React, { createContext, useRef, useState, type Node } from 'react';
import Timer from 'algorithms/Timer';
import {
  BOARD,
  KEYS,
  DELAY_NORMAL,
  ITEM_INITIAL,
  ITEM_FIXED,
  ITEM_CLICKED,
  BOARD_ROW,
  BOARD_COL,
} from './constants';

type PositionType = {| x: number, y: number |};
type SetItemCacheType = { [key: string]: (string) => void };

export type ContextType = {|
  isPathExist: boolean,
  isVisualized: boolean,
  isHelped: boolean,

  begin: { current: PositionType },
  end: { current: PositionType },
  board: { current: Array<Array<string>> },
  setItemCache: { current: SetItemCacheType },
  pathFinder: { current: any },
  delay: { current: number },

  clear: void => void,
  clearPath: void => void,
  updateItem: (number, number, string, number) => void,

  setIsPathExist: boolean => void,
  setIsVisualized: boolean => void,
  setIsHelped: boolean => void,
|};

const Context = createContext<ContextType>();

const Provider = ({ children }: Node) => {
  const [isPathExist, setIsPathExist] = useState<boolean>(true);
  const [isVisualized, setIsVisualized] = useState<boolean>(false);
  const [isHelped, setIsHelped] = useState<boolean>(false);

  const begin = useRef<PositionType>({ x: Math.round(BOARD_ROW / 2), y: 2 });
  const end = useRef<PositionType>({
    x: Math.round(BOARD_ROW / 2),
    y: BOARD_COL - 3,
  });
  const board = useRef<Array<Array<string>>>(JSON.parse(JSON.stringify(BOARD)));
  const setItemCache = useRef<SetItemCacheType>({});
  const pathFinder = useRef<any>(null);
  const delay = useRef<number>(DELAY_NORMAL);

  const updateItem = (
    ridx,
    cidx,
    type: string = ITEM_FIXED,
    timeFactor: number = 0,
  ) => {
    board.current[ridx][cidx] = type;
    const setItem = setItemCache.current[KEYS[ridx][cidx]];

    if (timeFactor) {
      const timer = new Timer({
        callback: () => setItem(type),
        delay: timeFactor * delay.current,
      });
      pathFinder.current.timers.push(timer);
    } else {
      setItem(type);
    }
  };

  const clear = () => {
    if (!isPathExist) setIsPathExist(true);
    if (isVisualized) setIsVisualized(false);
    const currentBoard = board.current;
    currentBoard.forEach((row, ridx) => {
      row.forEach((item, cidx) => {
        updateItem(ridx, cidx, ITEM_INITIAL);
      });
    });
  };

  const clearPath = () => {
    board.current.forEach((row, ridx) => {
      row.forEach((item, cidx) => {
        if (board.current[ridx][cidx] !== ITEM_CLICKED) {
          updateItem(ridx, cidx, ITEM_INITIAL);
        }
      });
    });
  };

  return (
    <Context.Provider
      value={{
        // States
        isPathExist,
        isVisualized,
        isHelped,

        // Methods
        clear,
        clearPath,
        updateItem,
        setIsPathExist,
        setIsVisualized,
        setIsHelped,

        // Refs
        pathFinder,
        begin,
        end,
        board,
        setItemCache,
        delay,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
