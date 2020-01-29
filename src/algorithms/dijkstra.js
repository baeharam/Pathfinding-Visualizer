import PriorityQueue from 'js-priority-queue';
import {
  BOARD_ROW,
  BOARD_COL,
  VISITED_COLOR,
} from 'constants.js';
import PathFinder from './pathFinder';

export default class Dijkstra extends PathFinder {
  constructor({begin, end, board, setState, delay}){
    super({ begin, end, board, setState, delay });
    this.pq = new PriorityQueue({ comparator: (a, b) => a.d - b.d });
  }

  execute() {
    this.pq.queue({ x: this.begin.x, y: this.begin.y, d: 0 });
    this.dist[this.begin.x][this.begin.y] = 0;
    let find = false;

    while(this.pq.length) {
      const current = this.pq.peek();
      this.pq.dequeue();
      const currentX = current.x;
      const currentY = current.y;
      const currentD = current.d;
      
      for(let i=0; i<4; i++) {
        const nextX = currentX + this.dx[i];
        const nextY = currentY + this.dy[i];
      
        if(nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL) continue;
        if(this.dist[currentX][currentY] + 1 >= this.dist[nextX][nextY]) continue;

        if(nextX === this.end.x && nextY === this.end.y) {
          this.copy[nextX][nextY].visit = true;
          this.prev[nextX][nextY].x = currentX;
          this.prev[nextX][nextY].y = currentY;
          find = true;
          break;
        }

        this.copy[nextX][nextY].color = VISITED_COLOR;
        this.copy[nextX][nextY].visit = true;

        this.dist[nextX][nextY] = this.dist[currentX][currentY] + 1;
        this.prev[nextX][nextY].x = currentX;
        this.prev[nextX][nextY].y = currentY;
        this.pq.queue({ x: nextX, y: nextY, d: this.dist[nextX][nextY] });
      }
      const temp = JSON.parse(JSON.stringify(this.copy));
      setTimeout(() => { this.setState(temp) }, this.delay*currentD);
      if(find) break;
    }
  }
}