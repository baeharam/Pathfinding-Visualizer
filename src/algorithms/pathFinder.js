// @flow

import { BOARD_ROW, BOARD_COL, SHORTEST_COLOR } from 'constants.js';

type BoardType = Array<Array<{| color: string, visit: boolean |}>>;

export type ConstructorType = {
  begin: {| x: number, y: number |},
  end: {| x: number, y: number |},
  board: BoardType,
  setState: (board : BoardType) => void,
  delay: number
};

export default class PathFinder {

  begin: {| x: number, y: number |};
  end: {| x: number, y: number |};
  copy: BoardType;
  _setState: (board : BoardType) => void;
  _delay: number;
  dist: Array<Array<number>>;
  prev: Array<Array<{| x: number, y: number |}>>;
  dx : Array<number>;
  dy : Array<number>;
  timers : Array<number>;

  constructor({ begin, end, board, setState, delay } : ConstructorType){
    this.begin = begin;
    this.end = end;
    this.copy = this._copyBoard(board);
    this._init();
    this._setState = setState;
    this._delay = delay;
  }

  static dx = [-1,1,0,0];
  static dy = [0,0,-1,1];
  static timers = [];

  clear = (newBoard : BoardType) => {
    this.copy = this._copyBoard(newBoard);
    this._init();
  }

  _copyBoard = (target : BoardType) : BoardType => {
    return JSON.parse(JSON.stringify(target));
  }

  updateBoard = (timeFactor : number) => {
    const temp = this._copyBoard(this.copy);
    const timer = setTimeout(() => { this._setState(temp); }, timeFactor*this._delay);
    PathFinder.timers.push(timer);
  }

  _init = () => {
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
    this.dist[this.begin.x][this.begin.y] = 0;
  }

  clearTimers() {
    PathFinder.timers.forEach((timer : TimeoutID) => { clearTimeout(timer); });
    PathFinder.timers = [];
  }

  paintShortestPath = () => {
    const { copy, begin, end, prev, updateBoard } = this;

    copy[end.x][end.y].visit = false;

    const path : Array<{| x: number, y: number |}> = [];
    let x : number = end.x;
    let y : number = end.y;

    while(prev[x][y].x !== -1 && prev[x][y].y !== -1) {
      path.push({ x, y });
      const tempX = x, tempY = y;
      x = prev[tempX][tempY].x;
      y = prev[tempX][tempY].y;
    }
    path.push({ x: begin.x, y: begin.y });

    for(let i=path.length-1; i>=0; i--) {
      x = path[i].x;
      y = path[i].y;
      copy[x][y].color = SHORTEST_COLOR;
      updateBoard(path.length-i);
    }
  }
}