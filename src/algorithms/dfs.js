// @flow

import { BOARD_ROW, BOARD_COL, ITEM_CLICKED, ITEM_VISITED } from 'constants.js';
import PathFinder, { type ConstructorType } from './pathFinder';

export default class Dfs extends PathFinder {
  find: boolean;

  visited: Array<Array<boolean>>;

  constructor(args: ConstructorType) {
    super(args);
    this.find = false;
    this.visited = [];
    for (let i = 0; i < BOARD_ROW; i++) {
      this.visited[i] = Array(BOARD_COL).fill(false);
    }
  }

  _dfs = (x: number, y: number, timeFactor: number) => {
    const { prev, end, visited, board, updateItem, _dfs } = this;
    visited[x][y] = true;

    for (let i = 0; i < PathFinder.dx.length; i++) {
      const nextX = x + PathFinder.dx[i];
      const nextY = y + PathFinder.dy[i];

      if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL)
        continue;
      if (visited[nextX][nextY] || board[nextX][nextY] === ITEM_CLICKED)
        continue;

      prev[nextX][nextY] = { x, y };
      updateItem(nextX, nextY, ITEM_VISITED, timeFactor);

      if (nextX === end.x && nextY === end.y) {
        this.find = true;
        return;
      }
      _dfs(nextX, nextY, timeFactor + 1);

      if (this.find) return;
    }
  };

  execute = (): boolean => {
    this._dfs(this.begin.x, this.begin.y, 1);
    if (!this.find) this.clearTimers();
    return this.find;
  };
}
