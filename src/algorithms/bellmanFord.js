// @flow

import {
  BOARD_ROW,
  BOARD_COL,
  ITEM_CLICKED,
  ITEM_VISITED,
} from 'constants.js';
import PathFinder from './pathFinder';

export default class BellmanFord extends PathFinder {

  _relax = (timeFactor : number) : {| timeFactor: number, find: boolean|} => {
    const { dist, prev, end, updateItem, board } = this;
    let find = false;
    for(let i=0; i<BOARD_ROW; i++){
      for(let j=0; j<BOARD_COL; j++){
        for(let k=0; k<PathFinder.dx.length; k++){
          const nextX = i + PathFinder.dx[k];
          const nextY = j + PathFinder.dy[k];

          if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL) continue;
          if (dist[i][j] === Infinity || dist[i][j] + 1 >= dist[nextX][nextY]) continue;
          if (board[nextX][nextY] === ITEM_CLICKED) continue;

          dist[nextX][nextY] = dist[i][j] + 1;
          prev[nextX][nextY] = { x: i, y: j };

          if (nextX === end.x && nextY === end.y) {
            find = true;
            continue;
          }

          updateItem(nextX, nextY, ITEM_VISITED, timeFactor);
          timeFactor++;
        }
      }
    }
    return { timeFactor, find };
  }

  execute = () : boolean => {
    const { board, _relax, updateItem, end } = this;

    let timeFactor = 1, find = false;
    for (let i=1; i<=board.length-1; i++) {
      const relaxedResult = _relax(timeFactor);
      timeFactor = relaxedResult.timeFactor;
      timeFactor++;
      if (relaxedResult.find) find = true;
    }
    updateItem(end.x, end.y, ITEM_VISITED, timeFactor);
    return find;
  }
}