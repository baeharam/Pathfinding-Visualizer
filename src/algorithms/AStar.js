// @flow

import PriorityQueue from 'js-priority-queue';
import {
  BOARD_ROW,
  BOARD_COL,
  VISITED_COLOR,
  CLICKED_COLOR,
} from 'constants.js';
import PathFinder, { type ConstructorType } from './pathFinder';

export default class AStar extends PathFinder {
  opened: Array<Array<boolean>>;

  constructor({begin, end, board, setState, delay} : ConstructorType){
    super({ begin, end, board, setState, delay });
    this.opened = new Array(BOARD_ROW);
    for (let i=0; i<BOARD_ROW; i++) {
      this.opened[i] = new Array(BOARD_COL).fill(false);
    }
    this.pq = new PriorityQueue<Object>({ comparator: (a,b) => a.f - b.f });
  }

  _h = (start : {| x: number, y: number |}) : number => {
    return Math.abs(start.x - this.end.x) + Math.abs(start.y - this.end.y);
  }

  execute = () : boolean => {
    const { 
      dist, pq, opened, copy,
      prev, begin, _h, end
    } = this;
    let timeFactor = 1;

    const fBegin = _h(begin);
    pq.queue({ x: begin.x, y: begin.y, f: fBegin })
    dist[begin.x][begin.y] = 0;
    opened[begin.x][begin.y] = true;

    while(pq.length) {
      const current : {| x: number, y: number, f: number |} = pq.peek();
      const currentX = current.x;
      const currentY = current.y;

      opened[currentX][currentY] = false;
      pq.dequeue();

      let find = false;
      for(let i=0; i<PathFinder.dx.length; i++) {
        const nextX : number = currentX + PathFinder.dx[i];
        const nextY : number = currentY + PathFinder.dy[i];

        if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL) continue;
        if (copy[nextX][nextY].color === CLICKED_COLOR) continue;

        const g = dist[currentX][currentY] + 1;
        const nextF = g + _h({x : nextX, y: nextY});

        if (g < dist[nextX][nextY]) {
          prev[nextX][nextY] = { x: currentX, y: currentY };
          dist[nextX][nextY] = g;

          if (!(nextX === end.x && nextY === end.y)) {
            copy[nextX][nextY].color = VISITED_COLOR;
          } else {
            find = true;
          }
          copy[nextX][nextY].visit = true;
          this.updateBoard(timeFactor);
          timeFactor++;

          if (find) break;

          if (opened[nextX][nextY] === false) {
            pq.queue({x: nextX, y: nextY, f: nextF});
            opened[nextX][nextY] = true;
          }
        }
      }

      if (find) {
        pq.clear();
        return true;
      }
    }
    return false;
  }
}