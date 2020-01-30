import PriorityQueue from 'js-priority-queue';
import {
  BOARD_ROW,
  BOARD_COL,
  VISITED_COLOR,
  CLICKED_COLOR,
} from 'constants.js';
import PathFinder from './pathFinder';

export default class AStar extends PathFinder {
  constructor({begin, end, board, setState, delay}){
    super({ begin, end, board, setState, delay });
    this.opened = new Array(BOARD_ROW);
    for(let i=0; i<BOARD_ROW; i++) {
      this.opened[i] = [];
      for(let j=0; j<BOARD_COL; j++) {
        this.opened[i][j] = false;
      }
    }
    this.pq = new PriorityQueue({ comparator: (a,b) => a.f - b.f });
  }

  _h(start) {
    return Math.abs(start.x - this.end.x) + Math.abs(start.y - this.end.y);
  }

  execute() {
    const dist = this.dist;
    const pq = this.pq;
    const opened = this.opened;
    const copy = this.copy;
    const prev = this.prev;
    const begin = this.begin;
    let timeFactor = 1;

    const fBegin = this._h(begin);
    pq.queue({ x: begin.x, y: begin.y, f: fBegin })
    dist[begin.x][begin.y] = 0;
    opened[begin.x][begin.y] = true;

    while(pq.length) {
      let current = pq.peek();
      opened[current.x][current.y] = false;

      if(current.x === this.end.x && current.y === this.end.y) {
        pq.clear();
        break;
      }

      pq.dequeue();

      let find = false;
      for(let i=0; i<this.dx.length; i++) {
        const nextX = current.x + this.dx[i];
        const nextY = current.y + this.dy[i];

        if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL) continue;
        if (copy[nextX][nextY] === CLICKED_COLOR) continue;

        const g = dist[current.x][current.y] + 1;
        if (g < dist[nextX][nextY]) {
          prev[nextX][nextY] = current;
          dist[nextX][nextY] = g;
          const fNext = g + this._h({x : nextX, y: nextY});

          if (!(nextX === this.end.x && nextY === this.end.y)) {
            copy[nextX][nextY].color = VISITED_COLOR;
          } else {
            find = true;
          }
          copy[nextX][nextY].visit = true;
          
          const temp = this.copyBoard(copy);
          const timer = setTimeout(() => { this.setState(temp) }, this.delay*timeFactor);
          this.timers.push(timer);
          timeFactor++;

          if (opened[nextX][nextY] === false) {
            pq.queue({x: nextX, y: nextY, f: fNext});
            opened[nextX][nextY] = true;
          }

          if(find) break;
        }
      }
    }
  }
}