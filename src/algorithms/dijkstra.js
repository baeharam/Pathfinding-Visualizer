import PriorityQueue from 'js-priority-queue';
import {
  BOARD_ROW,
  BOARD_COL,
  VISITED_COLOR,
  SHORTEST_COLOR
} from '../constants';

const dx = [-1,1,0,0];
const dy = [0,0,-1,1];

export default class Dijkstra {
  constructor({begin, end, board, setState, delay}){
    this.begin = begin;
    this.end = end;
    this.pq = new PriorityQueue({ comparator: (a, b) => a.d - b.d });
    this.dist = new Array(BOARD_ROW);
    this.prev = new Array(BOARD_ROW);
    for(let i=0; i<BOARD_ROW; i++) {
      this.dist[i] = [];
      this.prev[i] = [];
      for(let j=0; j<BOARD_COL; j++) {
        this.dist[i][j] = Infinity;
        this.prev[i][j] = { x: -1, y: -1 };
      }
    }
    this.copy = JSON.parse(JSON.stringify(board));
    this.setState = setState;
    this.delay = delay;
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
        const nextX = currentX + dx[i];
        const nextY = currentY + dy[i];
      
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

  paintShortestPath() {
    this.copy[this.end.x][this.end.y].visit = false;
    const path = [];
    let x = this.end.x;
    let y = this.end.y;

    while(this.prev[x][y].x !== -1 && this.prev[x][y].y !== -1) {
      path.push({ x, y });
      const tempX = x, tempY = y;
      x = this.prev[tempX][tempY].x;
      y = this.prev[tempX][tempY].y;
    }
    path.push({ x: this.begin.x, y: this.begin.y });

    for(let i=path.length-1; i>=0; i--) {
      x = path[i].x;
      y = path[i].y;
      this.copy[x][y].color = SHORTEST_COLOR;
      const temp = JSON.parse(JSON.stringify(this.copy));
      setTimeout(() => { this.setState(temp) }, this.delay*(path.length-i));
    }
  }
}