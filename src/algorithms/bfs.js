// @flow

import Queue from 'queue-fifo';
import { BOARD_ROW, BOARD_COL, ITEM_CLICKED, ITEM_VISITED } from 'constants.js';
import PathFinder, { type ConstructorType } from './pathFinder';

export default class Bfs extends PathFinder {
  visited: Array<Array<boolean>>;

  queue: any;

  constructor(args: ConstructorType) {
    super(args);
    this.visited = [];
    this.q = new Queue();
    for (let i = 0; i < BOARD_ROW; i++) {
      this.visited[i] = Array(BOARD_COL).fill(false);
    }
  }

  execute = (): boolean => {
    const { q, begin, end, visited, board, prev, updateItem } = this;
    q.enqueue({ x: begin.x, y: begin.y });
    visited[begin.x][begin.y] = true;
    let find = false;
    let timeFactor = 1;

    while (!q.isEmpty()) {
      const current = q.peek();
      q.dequeue();

      if (current.x === end.x && current.y === end.y) {
        break;
      }

      for (let i = 0; i < PathFinder.dx.length; i++) {
        const nextX = current.x + PathFinder.dx[i];
        const nextY = current.y + PathFinder.dy[i];

        if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL)
          continue;
        if (visited[nextX][nextY] || board[nextX][nextY] === ITEM_CLICKED)
          continue;

        visited[nextX][nextY] = true;
        prev[nextX][nextY] = { x: current.x, y: current.y };
        updateItem(nextX, nextY, ITEM_VISITED, timeFactor);
        timeFactor++;
        q.enqueue({ x: nextX, y: nextY });

        if (nextX === end.x && nextY === end.y) {
          find = true;
          break;
        }
      }
    }

    if (!find) this.clearTimers();
    return find;
  };
}
