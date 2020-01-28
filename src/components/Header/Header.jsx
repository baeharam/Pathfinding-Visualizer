import React, { useState, useContext, useEffect } from 'react';
import { DIJKSTRA, FLOYD } from 'constants.js';
import { Context } from 'Provider';
import PathFinder from 'algorithms/index.js';
import './Header.scss';

const Header = () => {

  const [type, setType] = useState(DIJKSTRA);
  const context = useContext(Context);
  const { begin, end, board, setBoard, pathFinder } = context;

  const onSelectChange = (e) => {
    setType(e.target.value);
  };

  const onVisualize = (_e) => {
    pathFinder.current  = new PathFinder[type]({
      begin,
      end,
      board,
      setState: setBoard,
      delay: 300
    });
    pathFinder.current.execute();
  };

  useEffect(() => {
    if (board[end.x][end.y].visit) {
      pathFinder.current.paintShortestPath();
    }
  }, [board, pathFinder, end]);


  return (
    <header className="header">
      <select className="header__select" onChange={onSelectChange}>
        <option value={DIJKSTRA} defaultChecked={true}>Dijkstra</option>
        <option value={FLOYD}>Floyd</option>
      </select>
      <button className="header__visualize" onClick={onVisualize}>
        Visualize!
      </button>
    </header>
  );
};

export default Header;