// @flow

import PriorityQueue from 'js-priority-queue';
import {
  BOARD_ROW,
  BOARD_COL,
  VISITED_COLOR,
  CLICKED_COLOR,
} from 'constants.js';
import PathFinder, { type ConstructorType } from './pathFinder';

export default class Dijkstra extends PathFinder {

  constructor(args : ConstructorType){
    super(args);
    this.pq = new PriorityQueue<Object>({ comparator: (a, b) => a.d - b.d });
  }

  execute = () : boolean => {
    const { pq, dist, prev, copy, begin, end } = this;

    pq.queue({ x: begin.x, y: begin.y, d: 0 });
    let find = false;

    while(pq.length) {
      const current : {| x: number, y: number, d: number |} = pq.peek();
      pq.dequeue();
      const currentX : number = current.x;
      const currentY : number = current.y;
      const currentD : number = current.d;
      
      let isUpdated = false;
      for(let i=0; i<PathFinder.dx.length; i++) {
        const nextX = currentX + PathFinder.dx[i];
        const nextY = currentY + PathFinder.dy[i];
      
        if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL) continue;
        if (dist[currentX][currentY] === Infinity || dist[currentX][currentY] + 1 >= dist[nextX][nextY]) continue;
        if (copy[nextX][nextY].color === CLICKED_COLOR) continue;

        if (nextX === end.x && nextY === end.y) {
          copy[nextX][nextY].visit = true;
          prev[nextX][nextY] = { x: currentX, y: currentY };
          isUpdated = true;
          find = true;
          break;
        }

        isUpdated = true;
        copy[nextX][nextY] = { color: VISITED_COLOR, visit: true };
        dist[nextX][nextY] = dist[currentX][currentY] + 1;
        prev[nextX][nextY] = { x: currentX, y: currentY };

        pq.queue({ x: nextX, y: nextY, d: dist[nextX][nextY] });
      }
      
      if (isUpdated) {
        this.updateBoard(currentD);
        if (find) {
          pq.clear();
          return true;
        }
      }
    }
    return false;
  }
}