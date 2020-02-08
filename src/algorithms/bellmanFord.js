// @flow

import { BOARD_ROW, BOARD_COL, ITEM_CLICKED, ITEM_VISITED } from 'constants.js';
import PathFinder from './pathFinder';

export default class BellmanFord extends PathFinder {
  _relax = (timeFactor: number): {| time: number, find: boolean |} => {
    const { dist, prev, end, updateItem, board } = this;
    let find = false;
    let time = timeFactor;
    for (let i = 0; i < BOARD_ROW; i++) {
      for (let j = 0; j < BOARD_COL; j++) {
        for (let k = 0; k < PathFinder.dx.length; k++) {
          const nextX = i + PathFinder.dx[k];
          const nextY = j + PathFinder.dy[k];

          if (
            nextX < 0 ||
            nextX >= BOARD_ROW ||
            nextY < 0 ||
            nextY >= BOARD_COL
          )
            continue;
          if (dist[i][j] === Infinity || dist[i][j] + 1 >= dist[nextX][nextY])
            continue;
          if (board[nextX][nextY] === ITEM_CLICKED) continue;

          dist[nextX][nextY] = dist[i][j] + 1;
          prev[nextX][nextY] = { x: i, y: j };

          if (nextX === end.x && nextY === end.y) {
            find = true;
            break;
          }

          updateItem(nextX, nextY, ITEM_VISITED, time);
          time++;
        }
        if (find) break;
      }
    }
    return { time, find };
  };

  execute = (): boolean => {
    const { _relax, updateItem, end } = this;

    let timeFactor = 1;
    let find = false;
    const vertex = BOARD_ROW * BOARD_COL;
    for (let i = 1; i <= vertex - 1; i++) {
      const relaxedResult = _relax(timeFactor);
      timeFactor = relaxedResult.time;
      timeFactor++;
      if (relaxedResult.find) {
        find = true;
        break;
      }
    }
    updateItem(end.x, end.y, ITEM_VISITED, timeFactor);
    if (!find) this.clearTimers();
    return find;
  };
}
