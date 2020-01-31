// @flow

import React, { createContext, useState, useRef, type Node } from 'react';
import { BOARD, KEYS, DELAY_NORMAL, ITEM_INITIAL } from './constants';
import PathFinder from 'algorithms/pathFinder';

type PositionType = {|x: number, y: number|};
type SetItemCacheType = { [key: string] : (string) => void };

export type ContextType = {|
  begin: PositionType,
  end: PositionType,
  setBegin: (PositionType) => void,
  setEnd: (PositionType) => void,
  isPathExist: boolean,
  setIsPathExist: (boolean) => void,
  clear: (void) => void,
  pathFinder: any,
|};

const Context = createContext<ContextType>();

const Provider = (props : {| children: Node |}) => {

  const [begin, setBegin] = useState<PositionType>({ x: 7, y: 2 });
  const [end, setEnd] = useState<PositionType>({ x: 11, y: 25 });
  const [isPathExist, setIsPathExist] = useState<boolean>(true);

  const board = useRef<Array<Array<string>>>(BOARD);
  const setItemCache = useRef<SetItemCacheType>({});
  const pathFinder = useRef<any>(null);
  const delay = useRef<number>(DELAY_NORMAL);

  const updateItem = (ridx, cidx, type, timeFactor = null) => {
    board.current[ridx][cidx] = type;
    const setItem = setItemCache.current[KEYS[ridx][cidx]];

    if (timeFactor) {
      const timer = 
        setTimeout(() => { setItem(type); }, timeFactor*delay.current);
      PathFinder.timers.push(timer);
    } else {
      console.log('check');
      setItem(type);
    }
  };

  const clear = () => {
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
      // State and method
      begin, setBegin,
      end, setEnd,clear,
      isPathExist, setIsPathExist,
      updateItem,

      // Refs
      pathFinder,
      board,
      setItemCache,
      delay
    }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, Provider };