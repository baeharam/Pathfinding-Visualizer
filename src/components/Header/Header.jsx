import React, { useState, useContext, useEffect } from 'react';
import { DIJKSTRA, BELLMAN_FORD, SHORTEST_COLOR, A_STAR } from 'constants.js';
import { Context } from 'Provider';
import PathFinder from 'algorithms/index.js';
import './Header.scss';

const Header = () => {

  const [type, setType] = useState(DIJKSTRA);
  const [delay, setDelay] = useState(300);
  const context = useContext(Context);
  const { 
    begin, end, board, setBoard, 
    pathFinder, clear, 
    setIsPathExist 
  } = context;

  const onAlgoChange = (e) => {
    setType(e.target.value);
  };

  const onDelayChange = (e) => {
    setDelay(e.target.value);
  };

  const onVisualize = () => {
    pathFinder.current  = new PathFinder[type]({
      begin,
      end,
      board,
      setState: setBoard,
      delay
    });
    const isPossiblePath = pathFinder.current.execute();
    setIsPathExist(isPossiblePath);
  };

  const onClear = () => { 
    clear();
  };

  useEffect(() => {
    if (board[end.x][end.y].visit) {
      pathFinder.current.paintShortestPath();
    }
  }, [board, pathFinder, end]);

  useEffect(() => {
    if (board[end.x][end.y].color === SHORTEST_COLOR) {
      pathFinder.current.clearTimers();
    }
  }, [board, pathFinder, end]);

  return (
    <header className="content-header">
      <select className="content-header__select" onChange={onAlgoChange}>
        <option value={DIJKSTRA} defaultChecked={true}>Dijkstra</option>
        <option value={BELLMAN_FORD}>Bellman-Ford</option>
        <option value={A_STAR}>A*</option>
      </select>
      <select className="content-header__select" onChange={onDelayChange} defaultValue={300}>
        <option value={550}>slowest</option>
        <option value={450}>slow</option>
        <option value={300}>normal</option>
        <option value={150}>fast</option>
        <option value={50}>fastest</option>
      </select>
      <button className="content-header__button" onClick={onVisualize}>
        Visualize!
      </button>
      <button className="content-header__button" onClick={onClear}>
        Clear
      </button>
    </header>
  );
};

export default Header;