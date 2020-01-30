import PriorityQueue from 'js-priority-queue';
import {
  BOARD_ROW,
  BOARD_COL,
  VISITED_COLOR,
  CLICKED_COLOR,
} from 'constants.js';
import PathFinder from './pathFinder';

export default class Dijkstra extends PathFinder {
  constructor({begin, end, board, setState, delay}){
    super({ begin, end, board, setState, delay });
    this.pq = new PriorityQueue({ comparator: (a, b) => a.d - b.d });
  }

  execute() {
    const pq = this.pq;
    const dist = this.dist;
    const prev = this.prev;
    const copy = this.copy;

    pq.queue({ x: this.begin.x, y: this.begin.y, d: 0 });
    let find = false;

    while(pq.length) {
      const current = pq.peek();
      pq.dequeue();
      const currentX = current.x;
      const currentY = current.y;
      const currentD = current.d;
      
      let isUpdated = false;
      for(let i=0; i<this.dx.length; i++) {
        const nextX = currentX + this.dx[i];
        const nextY = currentY + this.dy[i];
      
        if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL) continue;
        if (dist[currentX][currentY] === Infinity || dist[currentX][currentY] + 1 >= dist[nextX][nextY]) continue;
        if (copy[nextX][nextY].color === CLICKED_COLOR) continue;

        if (nextX === this.end.x && nextY === this.end.y) {
          copy[nextX][nextY].visit = true;
          prev[nextX][nextY] = current;
          isUpdated = true;
          find = true;
          break;
        }

        isUpdated = true;
        copy[nextX][nextY] = { color: VISITED_COLOR, visit: true };
        dist[nextX][nextY] = dist[currentX][currentY] + 1;
        prev[nextX][nextY] = current;

        pq.queue({ x: nextX, y: nextY, d: dist[nextX][nextY] });
      }
      
      if (isUpdated) {
        const temp = this.copyBoard(this.copy);
        const timer = setTimeout(() => { this.setState(temp) }, this.delay*currentD);
        this.timers.push(timer);

        if (find) break;
      }
    }
  }
}