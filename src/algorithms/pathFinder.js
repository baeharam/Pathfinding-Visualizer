import { BOARD_ROW, BOARD_COL, SHORTEST_COLOR } from 'constants.js';

export default class PathFinder {
  constructor({ begin, end, board, setState, delay }){
    this.begin = begin;
    this.end = end;
    this.copy = JSON.parse(JSON.stringify(board));
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
    this.setState = setState;
    this.delay = delay
    this.dx = [-1,1,0,0];
    this.dy = [0,0,-1,1];
    this.timers = [];
  }

  clearTimers() {
    this.timers.forEach((timer) => { clearTimeout(timer); });
    this.timers = [];
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
      const timer = setTimeout(() => { this.setState(temp) }, this.delay*(path.length-i));
      this.timers.push(timer);
    }
  }
}